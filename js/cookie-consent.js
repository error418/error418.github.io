---
---

"use strict";

function loadConsentRequiredScripts() {
  if (typeof(googleAnalyticsId) !== undefined) {
    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
    ga('create', googleAnalyticsId, 'auto');
    ga('set', 'anonymizeIp', true);
    ga('send', 'pageview');
    var gascript = document.createElement("script");
    gascript.async = true;
    gascript.src = "https://www.google-analytics.com/analytics.js";
    document.getElementsByTagName("head")[0].appendChild(gascript, document.getElementsByTagName("head")[0]);
  }
}

if (document.cookie.split(';').filter(function(item) {
  return item.indexOf('cookieconsent_status=allow') >= 0
}).length) {
  loadConsentRequiredScripts();
}

window.addEventListener("load", function() {
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
      "background": "#edeff5",
      "text": "#838391"
      },
      "button": {
      "background": "#4b81e8"
      }
    },
    "cookie": {
      "path": "{{ site.baseurl }}"
    },
    "type": "opt-in",
    "content": {
      "message": "{{ site.optin.notice }}",
      "dismiss": "{{ site.optin.decline }}",
      "deny": "{{ site.optin.decline }}",
      "allow": "{{ site.optin.accept }}",
      "link": "Learn more"
    },
    "onStatusChange": function(status, chosenBefore) {
      var type = this.options.type;
      var didConsent = this.hasConsented();
      if (type == 'opt-in' && didConsent) {
        loadConsentRequiredScripts();
      }
    }
  });
});
