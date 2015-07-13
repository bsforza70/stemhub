var locym = " ";
var map;
jQuery(document).ready(function($){
	//open/close lateral filter

	$('.cd-filter-trigger').on('click', function(){
		triggerFilter(true);
	});
	$('.cd-filter .cd-close').on('click', function(){
		triggerFilter(false);
	});

	function triggerFilter($bool) {
		var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
		elementsToTrigger.each(function(){
			$(this).toggleClass('filter-is-visible', $bool);
		});
	}

	//mobile version - detect click event on filters tab
	var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
		filter_tab_placeholder_default_value = 'Select',
		filter_tab_placeholder_text = filter_tab_placeholder.text();
	
	$('.cd-tab-filter li').on('click', function(event){
		//detect which tab filter item was selected
		var selected_filter = $(event.target).data('type');
			
		//check if user has clicked the placeholder item
		if( $(event.target).is(filter_tab_placeholder) ) {
			(filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value) ;
			$('.cd-tab-filter').toggleClass('is-open');

		//check if user has clicked a filter already selected 
		} else if( filter_tab_placeholder.data('type') == selected_filter ) {
			filter_tab_placeholder.text($(event.target).text());
			$('.cd-tab-filter').removeClass('is-open');	

		} else {
			//close the dropdown and change placeholder text/data-type value
			$('.cd-tab-filter').removeClass('is-open');
			filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
			filter_tab_placeholder_text = $(event.target).text();
			
			//add class selected to the selected filter item
			$('.cd-tab-filter .selected').removeClass('selected');
			$(event.target).addClass('selected');
		}
	});
	
	//close filter dropdown inside lateral .cd-filter 
	$('.cd-filter-block h4').on('click', function(){
		$(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
	})

	//fix lateral filter and gallery on scrolling
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
	});

	function fixGallery() {
		var offsetTop = $('.cd-main-content').offset().top,
			scrollTop = $(window).scrollTop();
		( scrollTop >= offsetTop ) ? $('.cd-main-content').addClass('is-fixed') : $('.cd-main-content').removeClass('is-fixed');
	}

	/************************************
		MitItUp filter settings
		More details: 
		https://mixitup.kunkalabs.com/
		or:
		http://codepen.io/patrickkunka/
	*************************************/

	buttonFilter.init();
	$('.cd-gallery ul').mixItUp({
	    controls: {
	    	enable: false
	    },
	    animation: {
	    	effects: 'fade'
	    },
	    callbacks: {
	    	onMixStart: function(){
	    		$('.cd-fail-message').fadeOut(200);
	    	},
	      	onMixFail: function(){
	      		$('.cd-fail-message').fadeIn(200);
	    	}
	    }
	});

	//search filtering
	//credits http://codepen.io/edprats/pen/pzAdg
	var inputText;
	var $matching = $();

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
		    timer = setTimeout(callback, ms);
		};
	})();

	$(".cd-filter-content input[type='search']").keyup(function(){
	  	// Delay function invoked to make sure user stopped typing
	  	delay(function(){
	    	inputText = $(".cd-filter-content input[type='search']").val().toLowerCase();
	   		// Check to see if input field is empty
	    	if ((inputText.length) > 0) {            
	      		$('.mix').each(function() {
		        	var $this = $(this);
		        
		        	// add item to be filtered out if input text matches items inside the title   
		        	if($this.attr('class').toLowerCase().match(inputText)) {
		          		$matching = $matching.add(this);
		        	} else {
		          		// removes any previously matched item
		          		$matching = $matching.not(this);
		        	}
	      		});
	      		$('.cd-gallery ul').mixItUp('filter', $matching);
	    	} else {
	      		// resets the filter to show all item if input is empty
	      		$('.cd-gallery ul').mixItUp('filter', 'all');
	    	}
	  	}, 200 );
	});

});

/*****************************************************
	MixItUp - Define a single object literal 
	to contain all filter custom functionality
*****************************************************/
var buttonFilter = {
  	// Declare any variables we will need as properties of the object
  	$filters: null,
  	groups: [],
  	outputArray: [],
  	outputString: '',
  
  	// The "init" method will run on document ready and cache any jQuery objects we will need.
  	init: function(){
    	var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.
    
    	self.$filters = $('.cd-main-content');
    	self.$container = $('.cd-gallery ul');
    
	    self.$filters.find('.cd-filters').each(function(){
	      	var $this = $(this);
	      
		    self.groups.push({
		        $inputs: $this.find('.filter'),
		        active: '',
		        tracker: false
		    });
	    });
	    
	    self.bindHandlers();
  	},
  
  	// The "bindHandlers" method will listen for whenever a button is clicked. 
  	bindHandlers: function(){
    	var self = this;

    	self.$filters.on('click', 'a', function(e){
	      	self.parseFilters();
    	});
	    self.$filters.on('change', function(){
	      self.parseFilters();           
	    });
  	},
  
  	parseFilters: function(){
	    var self = this;
	 
	    // loop through each filter group and grap the active filter from each one.
	    for(var i = 0, group; group = self.groups[i]; i++){
	    	group.active = [];
	    	group.$inputs.each(function(){
	    		var $this = $(this);
	    		if($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) {
	    			if($this.is(':checked') ) {
	    				group.active.push($this.attr('data-filter'));
	    			}
	    		} else if($this.is('select')){
	    			group.active.push($this.val());
	    		} else if( $this.find('.selected').length > 0 ) {
	    			group.active.push($this.attr('data-filter'));
	    		}
	    	});
	    }
	    self.concatenate();
  	},
  
  	concatenate: function(){
    	var self = this;
    
    	self.outputString = ''; // Reset output string
    
	    for(var i = 0, group; group = self.groups[i]; i++){
	      	self.outputString += group.active;
	    }
    
	    // If the output string is empty, show all rather than none:    
	    !self.outputString.length && (self.outputString = 'all'); 
	
    	// Send the output string to MixItUp via the 'filter' method:    
		if(self.$container.mixItUp('isLoaded')){
	    	self.$container.mixItUp('filter', self.outputString);
		}
  	}
};

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1XkF2NrqDckxbtqKMH8gdVcVaV8kl0i5VXsuN_ZcGkJE/pubhtml';

    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showInfo2,
                     simpleSheet: true } )

  function showInfo2(data, tabletop) {
  	var u = 0;
    while (u <= (data.length - 1)) {
    	if (data[u].acc == "TRUE" && data[u].spon == "FALSE") {
	        if (data[u].type == "Event"){
	        	var typeu = "events";
	        }
	        if (data[u].type == "Field Trip"){
	        	var typeu = "fieldtrips";
	        }
	        if (data[u].type == "Guest Speaker"){
	        	var typeu = "guestspeakers";
	        }
	        if (data[u].type == "Program or Camp"){
	        	var typeu = "programsandcamps";
	        }
	        if (data[u].type == "Mentoring or Shadowing"){
	        	var typeu = "mentoringandshadowing";
	        }
	        if (data[u].type == "Internship"){
	        	var typeu = "internships";
	        }
	        if (data[u].type == "Funding or Grant"){
	        	var typeu = "fundingandgrants";
	        }
	        if (data[u].type == "Diversity Outreaach"){
	        	var typeu = "diversityoutreach";
	        }

	        var target = data[u].target.split(',');
	        if ((target.indexOf("Kindergarten through Second Graders") !== -1) || (target.indexOf(" Kindergarten through Second Graders") !== -1)) {
	        	var k2y = true;
	        }
	        else {
	        	var k2y = false;
	        }
	        if ((target.indexOf("Third through Fifth Graders") !== -1) || (target.indexOf(" Third through Fifth Graders") !== -1)) {
	        	var y35y = true;
	        }
	        else {
	        	var y35y = false;
	        }
	        if ((target.indexOf("Six through Eighth Graders") !== -1) || (target.indexOf(" Six through Eighth Graders") !== -1)) {
	        	var y68y = true;
	        }
	        else {
	        	var y68y = false;
	        }
	        if ((target.indexOf("Highschoolers") !== -1) || (target.indexOf(" Highschoolers") !== -1)) {
	        	var highy = true;
	        }
	        else {
	        	var highy = false;
	        }
	        if ((target.indexOf("College Students") !== -1) || (target.indexOf(" College Students") !== -1)) {
	        	var collegey = true;
	        }
	        else {
	        	var collegey = false;
	        }
	        if ((target.indexOf("Adults") !== -1) || (target.indexOf(" Adults") !== -1)) {
	        	var adulty = true;
	        }
	        else {
	        	var adulty = false;
	        }
	        var targetlist = ["Kindergarten through Second Graders", "Third through Fifth Graders", "Six through Eighth Graders", "Highschoolers", "College Students", "Adults", " Kindergarten through Second Graders", " Third through Fifth Graders", " Six through Eighth Graders", " Highschoolers", " College Students", " Adults"];
	        var targetlistnew = ["k2", "35", "68", "high", "college", "adult", "k2", "35", "68", "high", "college", "adult"];
	        var t = 0;
	        var tu = " ";
	        while (t <= (targetlist.length)) {
		        var index = target.indexOf(targetlist[t]);

				if (~index) {
				    target[index] = targetlistnew[t];
				    var tu = tu + target[index] + ' ';
				}
				t++;
			}	
	        var cu = data[u].date.split('/');
	      	var dTu = new Date();
	        var dNu = new Date(cu[2], cu[0], cu[1]);

	        var field = data[u].field.split(',');
	        var f = 0;
	        var fi = " "
	        while (f <= (field.length - 1)) {
	        	var fi = fi + " " + field[f];
	        	f++;
	       	}

	        if (dTu < dNu) {
	        	var liu = '<li data-locxu="'+data[u].locx+'" data-locyu="'+data[u].locy+'" data-value="'+ data[u].price +'" data-date="'+dNu.getTime()+'" class="mix caption ' + typeu +' ' + data[u].description + ' ' + fi + ' ' + target + ' ' + data[u].cost + ' ' + tu + ' ' + data[u].imgalt +' '+ data[u].title + '"><img class="onezis" src="' + data[u].imgsrc + '" alt="' + data[u].imgalt + '"><div class="caption__overlay"><h1 class="caption__overlay__title">' + data[u].title + '</h1><p class="caption__overlay__content">' + data[u].description + '</p><div class="readmorecontainer"><a data-namem="' + data[u].title.toUpperCase() + '" data-k2y="'+ k2y +'" data-35y="'+ y35y +'" data-68y="'+ y68y +'" data-highy="'+ highy +'" data-collegey="'+ collegey +'" data-adulty="'+ adulty +'" data-imgsrcm="'+ data[u].imgsrc +'" data-pricem="'+ data[u].price +'" data-linkm="'+ data[u].link +'" data-descm="'+data[u].description+'" data-locm="'+ data[u].loc +'" data-datem="'+ data[u].date +'" data-toggle="modal" onclick="initialize(new google.maps.LatLng('+data[u].locx + ', ' + data[u].locy+'));" data-target="#exampleModal"><div class="button green center"><p id="vmas">View More</p></div></a></div></div></a></li>';
	        	document.getElementById("addToMe").insertAdjacentHTML('afterbegin', liu);
	      		}
	     	 }
      u++;
    }
    var u = 0;
    while (u <= (data.length - 1)) {
    	if (data[u].acc == "TRUE" && data[u].spon == "TRUE") {
	        if (data[u].type == "Event"){
	        	var typeu = "events";
	        }
	        if (data[u].type == "Field Trip"){
	        	var typeu = "fieldtrips";
	        }
	        if (data[u].type == "Guest Speaker"){
	        	var typeu = "guestspeakers";
	        }
	        if (data[u].type == "Program or Camp"){
	        	var typeu = "programsandcamps";
	        }
	        if (data[u].type == "Mentoring or Shadowing"){
	        	var typeu = "mentoringandshadowing";
	        }
	        if (data[u].type == "Internship"){
	        	var typeu = "internships";
	        }
	        if (data[u].type == "Funding or Grant"){
	        	var typeu = "fundingandgrants";
	        }
	        if (data[u].type == "Diversity Outreaach"){
	        	var typeu = "diversityoutreach";
	        }

	        var target = data[u].target.split(',');
	        	        if ((target.indexOf("Kindergarten through Second Graders") !== -1) || (target.indexOf(" Kindergarten through Second Graders") !== -1)) {
	        	var k2y = true;
	        }
	        else {
	        	var k2y = false;
	        }
	        if ((target.indexOf("Third through Fifth Graders") !== -1) || (target.indexOf(" Third through Fifth Graders") !== -1)) {
	        	var y35y = true;
	        }
	        else {
	        	var y35y = false;
	        }
	        if ((target.indexOf("Six through Eighth Graders") !== -1) || (target.indexOf(" Six through Eighth Graders") !== -1)) {
	        	var y68y = true;
	        }
	        else {
	        	var y68y = false;
	        }
	        if ((target.indexOf("Highschoolers") !== -1) || (target.indexOf(" Highschoolers") !== -1)) {
	        	var highy = true;
	        }
	        else {
	        	var highy = false;
	        }
	        if ((target.indexOf("College Students") !== -1) || (target.indexOf(" College Students") !== -1)) {
	        	var collegey = true;
	        }
	        else {
	        	var collegey = false;
	        }
	        if ((target.indexOf("Adults") !== -1) || (target.indexOf(" Adults") !== -1)) {
	        	var adulty = true;
	        }
	        else {
	        	var adulty = false;
	        }
	        var targetlist = ["Kindergarten through Second Graders", "Third through Fifth Graders", "Six through Eighth Graders", "Highschoolers", "College Students", "Adults", " Kindergarten through Second Graders", " Third through Fifth Graders", " Six through Eighth Graders", " Highschoolers", " College Students", " Adults"];
	        var targetlistnew = ["k2", "35", "68", "high", "college", "adult", "k2", "35", "68", "high", "college", "adult"];
	        var t = 0;
	        var tu = " ";
	        while (t <= (targetlist.length)) {
		        var index = target.indexOf(targetlist[t]);

				if (~index) {
				    target[index] = targetlistnew[t];
				    var tu = tu + target[index] + ' ';
				}
				t++;
			}	
	        var cu = data[u].date.split('/');
	      	var dTu = new Date();
	        var dNu = new Date(cu[2], cu[0], cu[1]);

	        var field = data[u].field.split(',');
	        var f = 0;
	        var fi = " "
	        while (f <= (field.length - 1)) {
	        	var fi = fi + " " + field[f];
	        	f++;
	       	}

	        if (dTu < dNu) { 
	        	var liu = '<li data-locxu="'+data[u].locx+'" data-locyu="'+data[u].locy+'" data-value="'+ data[u].price +'" data-date="'+dNu.getTime()+'" class="mix caption ' + typeu +' ' + data[u].description + ' ' + fi + ' ' + target + ' ' + data[u].cost + ' ' + tu + ' ' + data[u].imgalt +' '+ data[u].title + '"><img class="onezis" src="' + data[u].imgsrc + '" alt="' + data[u].imgalt + '"><p style="position: absolute;color:white;top: 1%;right: 1%;">sponsored</p><div class="caption__overlay"><h1 class="caption__overlay__title">' + data[u].title + '</h1><p class="caption__overlay__content">' + data[u].description + '</p><div class="readmorecontainer"><a data-namem="' + data[u].title.toUpperCase() + '" data-k2y="'+ k2y +'" data-35y="'+ y35y +'" data-68y="'+ y68y +'" data-highy="'+ highy +'" data-collegey="'+ collegey +'" data-adulty="'+ adulty +'" data-imgsrcm="'+ data[u].imgsrc +'" data-pricem="'+ data[u].price +'" data-linkm="'+ data[u].link +'" data-descm="'+data[u].description+'" data-locm="'+ data[u].loc +'" data-datem="'+ data[u].date +'" data-toggle="modal" onclick="initialize(new google.maps.LatLng('+data[u].locx + ', ' + data[u].locy+'));" data-target="#exampleModal"><div class="button green center"><p id="vmas">View More</p></div></a></div></div></a></li>';
	        	document.getElementById("addToMe").insertAdjacentHTML('afterbegin', liu);
	      		}
	     	 }
      u++;
    }
    document.getElementById("addToMe").insertAdjacentHTML('beforeend', '<li class="gap"></li><li class="gap"></li><li class="gap"></li>');
    $('.cd-gallery ul').mixItUp('filter', 'all');
    $('.cd-gallery').show();

     var map;

	 function initialize() {
	     var myLatlng1 = new google.maps.LatLng(38.646369, -90.286470);
	       var styles = [{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"color": "#444444"}]},{"featureType": "landscape","elementType": "all","stylers": [{"color": "#f2f2f2"}]},{"featureType": "poi","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "road","elementType": "all","stylers": [{"saturation": -100},{"lightness": 45}]},{"featureType": "road","elementType": "labels.text.fill","stylers":[{"visibility": "on"},{"color": "#000000"}]},{"featureType": "road.highway","elementType": "all","stylers": [{"visibility": "simplified"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"visibility": "on"},{"color": "#2ecc71"}]},{"featureType": "road.arterial","elementType": "geometry.stroke","stylers": [{"color": "#2ecc71"}]},{"featureType": "road.arterial","elementType": "labels.text.stroke","stylers": [{"color": "#ff0000"},{"visibility": "off"}]},{"featureType": "road.arterial","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "road.local","elementType": "geometry.stroke","stylers": [{"color": "#2ecc71"},{"visibility": "on"},{"weight": "0.20"}]},{"featureType": "transit","elementType": "all","stylers":[{"visibility": "off"}]},{"featureType": "water","elementType": "all","stylers":[{"color": "#2ecc71"},{"visibility": "on"}]}];
	     var mapOptions = {
	         zoom: 10,
	         center: myLatlng1,
	         styles: styles,
	         scrollwheel: false,
		     navigationControl: true,
		     streetViewControl: false,
		     mapTypeControl: false,
		     scaleControl: false,
		     panControl: true,
		     draggable: true,
	         mapTypeId: google.maps.MapTypeId.ROADMAP
	     };

	     var map = new google.maps.Map(document.getElementById('map'),
	     mapOptions);
	     //var modalmap = new google.maps.Map(document.getElementById('modalmap'),
	     //mapOptions);

	     if (screen.width < 500) {
	   	 	map.set('draggable', false);
	   	 }

	     if (navigator.geolocation) {
	         navigator.geolocation.getCurrentPosition(pz, showError);
	     }

	         	function pz(position) {
	             initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	             map.setCenter(initialLocation);
		    	var u = 0;
		    	var liremove = [];
		    	while (u <= (document.getElementsByClassName("mix").length - 1)) {
	             	var uz = (document.getElementsByClassName("mix").length - u) - 1;
		             var locdiff = Math.sqrt(Math.pow(results[0].geometry.location.lat() - parseFloat(document.getElementsByClassName("mix")[uz].getAttribute("data-locxu")),2) + Math.pow(results[0].geometry.location.lng() - parseFloat(document.getElementsByClassName("mix")[uz].getAttribute("data-locyu")), 2));
					 document.getElementsByClassName("mix")[uz].setAttribute("data-locd", locdiff);
					 if (locdiff >= 6) {
					 	liremove.unshift(uz);
					 }
		             u++;
	         	}
	         	var lenremove = liremove.length;
	         	while (lenremove > 0) {
	         		document.getElementsByClassName("mix")[liremove[lenremove - 1]].remove();
	         		lenremove--;
	         	}
	         }

	         function showError(error) {
	     		$('#zipModal').modal('show');
	         }

	     var mm = 0;
	     while (mm <= (data.length - 1)) {
	     	var cm = data[mm].date.split('/');
	      	var dTm = new Date();
	        var dNm = new Date(cm[2], cm[0], cm[1]);
	        if (dTm < dNm && data[mm].acc == "TRUE") {
		        var myMarker = new google.maps.LatLng(data[mm].locx, data[mm].locy);
			    var marker = new google.maps.Marker({
			        position: myMarker,
			        map: map,
			        title: data[mm].title
			  	 });
			}
		    mm++;

	     }
	 }
	 initialize();
}
var map;
				function changeOrder() {
				    if (document.getElementById("selectThis2").value == "pasc"){
				        $('.cd-gallery ul').mixItUp('sort', 'value:asc');
				    }     
				    else if (document.getElementById("selectThis2").value == "pdesc") {
				        $('.cd-gallery ul').mixItUp('sort', 'value:desc');
				    } 
				    else if (document.getElementById("selectThis2").value == "ddesc") {
				        $('.cd-gallery ul').mixItUp('sort', 'date:desc');
				    } 
				    else if (document.getElementById("selectThis2").value == "dasc") {
				        $('.cd-gallery ul').mixItUp('sort', 'date:asc');
				    } 
				    else if (document.getElementById("selectThis2").value == "prasc") {
				        $('.cd-gallery ul').mixItUp('sort', 'locd:asc');
				    } 
				    else if (document.getElementById("selectThis2").value == "prdesc") {
				        $('.cd-gallery ul').mixItUp('sort', 'locd:desc');
				    }
				    else if (document.getElementById("selectThis2").value == "none") {
				    	$('.cd-gallery ul').mixItUp('sort', 'default');
				    }
				 }

				    	$(function(){
						    $('#exampleModal').on('show.bs.modal', function (event) {
						        $(this).find('.modal-title').text($(event.relatedTarget).data('namem'));
						        $(this).find('.modal-date-m').text($(event.relatedTarget).data('datem'));
						        $(this).find('.modal-price-m').text("$" + $(event.relatedTarget).data('pricem'));
						        $(this).find('.modal-loc-m').text($(event.relatedTarget).data('locm'));
						        $(this).find('.modal-desc-m').text($(event.relatedTarget).data('descm'));
						        $(this).find('.modal-vs').attr("href", $(event.relatedTarget).data('linkm'));
						       // $(this).find('.modal-img-m').attr("src", $(event.relatedTarget).data('imgsrcm'));
						        $(this).find('#k2y').prop( "checked", $(event.relatedTarget).data('k2y'));
						        $(this).find('#35y').prop( "checked", $(event.relatedTarget).data('35y'));
						        $(this).find('#68y').prop( "checked", $(event.relatedTarget).data('68y'));
						        $(this).find('#highy').prop( "checked", $(event.relatedTarget).data('highy'));
						        $(this).find('#collegey').prop( "checked", $(event.relatedTarget).data('collegey'));
						        $(this).find('#adulty').prop( "checked", $(event.relatedTarget).data('adulty'));
						    });
						});
					var geocoder;
					function initialize(positionz) {
						var poz = positionz;
					       var stylez = [{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"color": "#444444"}]},{"featureType": "landscape","elementType": "all","stylers": [{"color": "#f2f2f2"}]},{"featureType": "poi","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "road","elementType": "all","stylers": [{"saturation": -100},{"lightness": 45}]},{"featureType": "road","elementType": "labels.text.fill","stylers":[{"visibility": "on"},{"color": "#000000"}]},{"featureType": "road.highway","elementType": "all","stylers": [{"visibility": "simplified"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"visibility": "on"},{"color": "#2ecc71"}]},{"featureType": "road.arterial","elementType": "geometry.stroke","stylers": [{"color": "#2ecc71"}]},{"featureType": "road.arterial","elementType": "labels.text.stroke","stylers": [{"color": "#ff0000"},{"visibility": "off"}]},{"featureType": "road.arterial","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "road.local","elementType": "geometry.stroke","stylers": [{"color": "#2ecc71"},{"visibility": "on"},{"weight": "0.20"}]},{"featureType": "transit","elementType": "all","stylers":[{"visibility": "off"}]},{"featureType": "water","elementType": "all","stylers":[{"color": "#2ecc71"},{"visibility": "on"}]}];
					     var mapOptions = {
					         zoom: 10,
					         center: poz,
					         styles: stylez,
					         scrollwheel: false,
						     navigationControl: false,
						     streetViewControl: false,
						     mapTypeControl: false,
						     scaleControl: false,
						     panControl: true,
						     draggable: true,
					         mapTypeId: google.maps.MapTypeId.ROADMAP
					     };
				
					     var modalmap = new google.maps.Map(document.getElementById('modalmap'),
					     mapOptions);

					     var marker = new google.maps.Marker({
					      position: positionz,
					      map: modalmap
					 	 });
					   	 modalmap.panTo(poz);

					   	 if (screen.width < 500) {
					   	 	modalmap.panBy(-200,-150);
					   	 	modalmap.set('draggable', false);
					   	 }

					   	 else {
					   	 modalmap.panBy(-300,-150);
					 	}
					}
						var geocoder = new google.maps.Geocoder();
					         function codeAddress() {
							  var address = document.getElementById('modalzipz').value;
							  geocoder.geocode( { 'address': address}, function(results, status) {
							    if (status == google.maps.GeocoderStatus.OK) {
							    	$('#zipModal').modal('hide');
							    	//map.setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
							    	var u = 0;
							    	var liremove = [];
							    	while (u <= (document.getElementsByClassName("mix").length - 1)) {
						             	var uz = (document.getElementsByClassName("mix").length - u) - 1;
							             var locdiff = Math.sqrt(Math.pow(results[0].geometry.location.lat() - parseFloat(document.getElementsByClassName("mix")[uz].getAttribute("data-locxu")),2) + Math.pow(results[0].geometry.location.lng() - parseFloat(document.getElementsByClassName("mix")[uz].getAttribute("data-locyu")), 2));
										 document.getElementsByClassName("mix")[uz].setAttribute("data-locd", locdiff);
										 if (locdiff >= 6) {
										 	liremove.unshift(uz);
										 }
							             u++;
						         	}
						         	var lenremove = liremove.length;
						         	while (lenremove > 0) {
						         		document.getElementsByClassName("mix")[liremove[lenremove - 1]].remove();
						         		lenremove--;
						         	}

							    } else {
							      alert('You entered something incorrectly, Error Code: ' + status);
							    }
							  });
							}
