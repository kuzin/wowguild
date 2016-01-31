"use strict";angular.module("wowApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngOrderObjectBy","processIDFilter","angularMoment","angularUtils.directives.dirPagination","oc.lazyLoad","pouchdb","hc.marked","tien.clndr"]).config(["$routeProvider",function(a){function b(b,c,d){a.when(d,{templateUrl:"views/"+b+".html",controller:c})}b("main","MainCtrl","/"),b("posts","DraftsCtrl","/blog/drafts"),b("posts","PostCtrl","/blog/post/:id"),b("posts","PostsCtrl","/blog"),b("new","EditCtrl","/blog/edit/:id"),b("new","NewCtrl","/blog/new"),b("roster","MainCtrl","/roster"),b("about","MainCtrl","/about"),b("404","MainCtrl","/404"),b("register","RegCtrl","/blog/register"),b("login","LoginCtrl","/blog/login"),b("calendar","CalCtrl","/calendar"),b("apply","MainCtrl","/apply"),a.otherwise({redirectTo:"/404"})}]),angular.module("processIDFilter",[]).filter("processID",function(){return function(a){var b=/-avatar\.[^.]+$/,c=a.toString(),d="",e=c.replace(b,d);return e}}),angular.module("wowApp").directive("ngShowYear",["$filter",function(a){return{link:function(b,c){c.text(a("date")(new Date,"yyyy"))}}}]),angular.module("wowApp").constant("API_KEY","kqf7f4abwwnfwbp93m7r6f8nxmerbydm").constant("GOOGLE_CAL_API","AIzaSyBuQEwiKrMi3bxFw7x0PeUzs87RCYlAK6U").constant("BASE_URL","https://us.api.battle.net").constant("DB","https://manhaverideryinvionsionj:b5e2984b12ac808269375395f70ff369751720af@kuzin.cloudant.com/wowapi").constant("REALM","Dalaran").constant("GUILD","Seventh Level Save Point"),angular.module("wowApp").service("service",["pouchDB","DB",function(a,b){a(b)}]),angular.module("wowApp").controller("MainCtrl",["$scope","$http","API_KEY","REALM","GUILD","BASE_URL","$ocLazyLoad",function(a,b,c,d,e,f,g){b.get(f+"/wow/guild/"+d+"/"+e+"?fields=members,news&locale=en_US&apikey="+c).success(function(b){a.guildAPI=b;g.load("//wow.zamimg.com/widgets/power.js")})}]),angular.module("wowApp").controller("CalCtrl",["$scope","$log","$http",function(a,b,c){a.$log=b,a.options={multiDayEvents:{endDate:"end",singleDay:"date",startDate:"start"}},c.get("data/cal.ics").success(function(b){var c=ICAL.parse(b),d=new ICAL.Component(c[2]);a.events=[];var e;for(e=0;e<d.jCal.length;e++){var f=d.jCal[e][1];a.events.push({title:f[6][3],start:new Date(f[3][3]).getTime(),end:new Date(f[4][3]).getTime(),organizer:f[9][3],location:f[8][3],description:f[7][3]})}})}]),angular.module("wowApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("wowApp").run(["$templateCache",function(a){a.put("views/404.html","Oh noes! 404!"),a.put("views/about.html",'<div class="memberList"> <ul class="roster-window"> <li ng-repeat="member in guildAPI.members | orderObjectBy: \'rank\'" ng-style="{\'background-image\' : \'url(http://render-api-us.worldofwarcraft.com/static-render/us/\' + (member.character.thumbnail | processID) + \'-profilemain.jpg)\'}"> <h3>{{member.character.name | limitTo : \'10\'}}<span ng-if="member.character.name.length > 10">...</span></h3> <img class="wRank" ng-src="images/ranks/{{member.rank}}.png"> </li> </ul> </div>'),a.put("views/calendar.html",'<tien-clndr class="clndr" tien-clndr-object="clndr" tien-clndr-events="events" tien-clndr-options="options" id="full-clndr"> <div class="clndr-controls"> <div class="clndr-previous-button" ng-click="clndr.back()">&lt;</div> <div class="clndr-next-button" ng-click="clndr.forward()">&gt;</div> <div class="current-month">{{month}} {{year}}</div> </div> <div class="clndr-grid"> <div class="days-of-the-week"> <div class="header-day" ng-repeat="day in daysOfTheWeek track by $index"> {{day}} </div> </div> <div class="days"> <div class="{{day.classes}}" ng-repeat="day in days"> <div class="event-indicator" ng-show="day.events.length">{{day.events.length}}</div> {{day.day}} </div> </div> </div> <div class="event-listing"> <div class="event-listing-title">EVENTS IN {{month | uppercase}}</div> <div class="event-item" ng-repeat="event in clndr.eventsThisInterval track by $index" ng-show="clndr.eventsThisInterval.length != 0"> <div class="blizard-event" style="background: pink" ng-show="event.organizer == \'mailto:blizzard@dalaran.worldofwarcraft\'"> <time ng-show="event.start">{{event.start | date : \'MMM dd @ h a\'}} <div ng-hide="event.start == event.end">- {{event.end | date : \'h a\'}}</div></time> <time ng-show="event.date">{{event.date | date : \'MMM dd\'}}</time> <div class="event-item-name">{{event.title}}</div> </div> <div class="guild-event" ng-show="event.organizer != \'mailto:blizzard@dalaran.worldofwarcraft\'"> <time ng-show="event.start">{{event.start | date : \'MMM dd @ h a\'}} <div ng-hide="event.start == event.end">- {{event.end | date : \'h a\'}}</div></time> <time ng-show="event.date">{{event.date | date : \'MMM dd\'}} - </time> <div class="event-item-name"><strong>{{event.title}}</strong></div> <div class="event-item-location" ng-hide="event.location == \'\'">{{event.location}}</div> <div class="event-item-description" ng-hide="event.description == \'\'">{{event.description}}</div> </div> </div> <div class="events-none" ng-show="clndr.eventsThisInterval.length == 0"> <h1>No Events</h1> </div> </div> </tien-clndr>'),a.put("views/main.html",""),a.put("views/new.html",'<div class="row"> <h1>What\'s on your mind?</h1> <p> <a href="#">Write using Markdown.</a> </p> </div> <form ng-submit="submit()"> <div class="form-group"> <textarea ng-model="post.body" autofocus style="width:100%; height:300px">\n    </textarea> </div> <div class="checkbox"> <label> <input type="checkbox" ng-model="post.status" ng-init="true"> <span>Publish?</span> </label> </div> <button class="btn btn-success" type="submit">Save</button></form>'),a.put("views/posts.html",'<div class="newsList" ng-controller="MainCtrl"> <h4>News Feed</h4> <dir-pagination-controls template-url="mods/paging.html"></dir-pagination-controls> <ul class="guild-news"> <li dir-paginate="story in guildAPI.news | itemsPerPage: 10" class="{{story.type}}"> <div class="achievement" ng-show="{{story.type == \'guildAchievement\'}}"> <a ng-href="http://wowhead.com/achievement={{story.achievement.id}}">{{story.achievement.title}}</a> <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Earned By <strong>{{story.character}}</strong> <time><span am-time-ago="story.timestamp"></span></time> </div> <div class="achievement" ng-show="{{story.type == \'playerAchievement\'}}"> <a ng-href="http://wowhead.com/achievement={{story.achievement.id}}">{{story.achievement.title}}</a> <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Earned By <strong>{{story.character}}</strong> <time><span am-time-ago="story.timestamp"></span></time> </div> <div class="itemLooted" ng-show="{{story.type == \'itemLoot\'}}"> <a ng-href="http://wowhead.com/item={{story.itemId}}">{{story.itemId}}</a> <span class="glyphicon glyphicon-gift" aria-hidden="true"></span> Looted By <strong>{{story.character}}</strong> <time><span am-time-ago="story.timestamp"></span></time> </div> <div class="itemBought" ng-show="{{story.type == \'itemPurchase\'}}"> <a ng-href="http://wowhead.com/item={{story.itemId}}">{{story.itemId}}</a> <span class="glyphicon glyphicon-credit-card" aria-hidden="true"></span> Purchased By <strong>{{story.character}}</strong> <time><span am-time-ago="story.timestamp"></span></time> </div> <div class="itemCrafted" ng-show="{{story.type == \'itemCraft\'}}"> <a ng-href="http://wowhead.com/item={{story.itemId}}">{{story.itemId}}</a> <span class="glyphicon glyphicon-wrench" aria-hidden="true"></span> Crafted By <strong>{{story.character}}</strong> <time><span am-time-ago="story.timestamp"></span></time> </div> </li> </ul> </div> <div style="color: white !important"> <div class="row" ng-hide="posts"> <h1>Loading</h1> </div> <div class="row" ng-show="posts.length == 0"> <h1>No Posts!</h1> </div> <ul class="posts"> <li class="post" id="{{post._id}}" ng-repeat="post in posts | orderBy:\'date\': true"> {{ post.date | date: \'MM/dd/yyyy\' }} <a ng-href="#/blog/edit/{{post._id}}">Edit</a> <div class="" ng-bind-html="post.body | markdown"> </div></li> </ul> </div>'),a.put("views/roster.html",'<div class="roster"> <div class="page-header"> <h3>Current Roster</h3> </div> <table> <thead> <tr> <th>•</th> <th>Name</th> <th>Rank</th> <th>Race</th> <th>Class</th> <th>Spec</th> <th>Level</th> <th>Achievement Points</th> </tr><tr> </tr></thead> <tbody> <tr ng-repeat="member in guildAPI.members | orderObjectBy: \'rank\'"> <td><img ng-src="http://us.battle.net/static-render/us/{{member.character.thumbnail}}"></td> <td>{{member.character.name | limitTo : \'10\'}}</td> <td><img class="wRank" ng-src="images/ranks/{{member.rank}}.png"></td> <td><a ng-href="http://wowhead.com/race={{member.character.race}}"><img class="wRace" ng-src="images/races/{{member.character.gender}}{{member.character.race}}.png"></a></td> <td><a ng-href="http://wowhead.com/class={{member.character.class}}"><img class="wClass" ng-src="images/class/64/{{member.character.class}}.png"></a></td> <td><a ng-href="http://wowhead.com/class={{member.character.class}}"><img class="wSpec" ng-src="images/spec/{{member.character.class}}/{{member.character.spec.name | lowercase}}.png"></a></td> <td>{{member.character.level}}</td> <td>{{member.character.achievementPoints | number}}<img src="images/ui/sheild.62076b49.png"></td> </tr> </tbody> </table> </div>')}]);