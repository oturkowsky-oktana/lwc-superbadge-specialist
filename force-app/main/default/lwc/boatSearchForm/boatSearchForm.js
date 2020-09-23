import { LightningElement, wire, track } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class boatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    
    // Private
    error = undefined;
    
    // Needs explicit track due to nested data
    @track searchOptions = [];
    
    // Wire a custom Apex method
    @wire(getBoatTypes)
      boatTypes({ error, data }) {
      if (data) {
        this.searchOptions = data.map( type => {
            let item = {
                label: type.Name,
                value: type.Id
            }
            return item
        });
        this.searchOptions = [
            { label: 'All Types', value: '' },
            ...this.searchOptions
        ];
        this.selectedBoatTypeId = '';
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
      }
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
      // Create the const searchEvent
      // searchEvent must be the new custom event search
      this.selectedBoatTypeId = event.detail.value
      const searchEvent = new CustomEvent('search',{detail:{boatTypeId: this.selectedBoatTypeId}});
      this.dispatchEvent(searchEvent);
    }
  }