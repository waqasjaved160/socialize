/**
 * Created by waqas_000 on 12/15/2015.
 */
app = angular.module('socialize', ['angular-meteor', 'ui.router', 'accounts.ui']);

Accounts.ui.config({
   passwordSignupFields: "USERNAME_AND_EMAIL"
});

Session.set("messageLimit", 50);
lastScrollTop = 0;
$(window).scroll(function(){
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100){
        var scrollTop = $(this).scrollTop();
        if (scrollTop > lastScrollTop){
            Session.set("messageLimit", Session.get("messageLimit") + 5);
        }
        lastScrollTop = scrollTop;
    }
});