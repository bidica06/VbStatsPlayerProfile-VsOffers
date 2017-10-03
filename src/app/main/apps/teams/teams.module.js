(function ()
{
    'use strict';

    angular
        .module('app.teams',
            [
                // 3rd Party Dependencies
                'xeditable'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {

        $stateProvider.state('app.teams', {
            url    : '/teams',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/apps/teams/teams.html',
                    controller : 'TeamsController as vm'
                }
            },
            resolve: {
                Users: function (msApi)
                {
                    return msApi.resolve('teams.users@get');
                },
                Teams: function (msApi)
                {
                    return msApi.resolve('teams.teams@get');
                },
                Ages: function (msApi)
                {
                    return msApi.resolve('teams.ages@get');
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/teams');

        // Api
        msApiProvider.register('teams.users', ['app/data/contacts/user.json']);
        msApiProvider.register('teams.teams', ['app/data/contacts/team.json']);
        msApiProvider.register('teams.ages', ['app/data/contacts/age.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.teams', {
            title : 'Teams',
            icon  : 'icon-account-box',
            state : 'app.teams',
            weight: 10
        });

    }

})();