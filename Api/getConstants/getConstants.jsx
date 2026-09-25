const urls = {
    TEST:{
        UrlTX:'https://txtest.lappiz.io',
        UrlAPI: 'https://designertest.lappiz.io',
        
    },
    PROD:{
        UrlTX:'https://tx.lappiz.io',
        UrlAPI: 'https://designer.lappiz.io',
    }
}
return urls[_appsettings.environment]