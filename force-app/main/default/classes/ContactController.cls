public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        List<Contact> lc = [SELECT FirstName, LastName, Email FROM Contact WITH_SECURITY_ENFORCED];
        if(!lc.isEmpty()){
            throw new AuraHandledException('Forced Error');
        }
        return null;
    }
}
