//window.onload = function() { init() };
/*$(document).ready(function() { init() });

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/15XXCaY21smnsH3_5DqtQpds1ObsG6RQ4BjNGPdtWDSI/pubhtml';

  function init() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showInfo,
                     simpleSheet: true } )
  }

  function showInfo(data, tabletop) {
    console.log(data);
    var y = 0;
    var x = 0;
   // var liy = create('<li class="mix caption ' + data[y].tags + '"><img src="' + data[y].imgsrc + '" alt="' + data[y].imgalt + '"><div class="caption__overlay"><h1 class="caption__overlay__title">' + data[y].title + '</h1><p class="caption__overlay__content">' + data[y].description + '</p><div class="readmorecontainer"><a href="' + data[y].link + '"><div class="button green center"><p id="vmas">View More</p></div></a></div></div></a></li>');
   // var lix = create('<li class="mix caption ' + data[x].tags + '"><img src="' + data[x].imgsrc + '" alt="' + data[x].imgalt + '"><div class="caption__overlay"><h1 class="caption__overlay__title">' + data[x].title + '</h1><p class="caption__overlay__content">' + data[x].description + '</p><div class="readmorecontainer"><a href="' + data[x].link + '"><div class="button green center"><p id="vmas">View More</p></div></a></div></div></a></li>');
    while (y <= (data.length - 1)) {
      if (data[y].spon == "FALSE") {
        var liy = '<li class="mix caption ' + data[y].tags + '"><img src="' + data[y].imgsrc + '" alt="' + data[y].imgalt + '"><div class="caption__overlay"><h1 class="caption__overlay__title">' + data[y].title + '</h1><p class="caption__overlay__content">' + data[y].description + '</p><div class="readmorecontainer"><a href="' + data[y].link + '"><div class="button green center"><p id="vmas">View More</p></div></a></div></div></a></li>';
        document.getElementById("addToMe").insertAdjacentHTML('afterbegin', liy);
      }
      else {

      }
      y++;
    }
    while (x <= (data.length - 1)) {
      if (data[x].spon == "TRUE") {
        var lix = '<li class="mix caption ' + data[x].tags + '"><img src="' + data[x].imgsrc + '" alt="' + data[x].imgalt + '"><div class="caption__overlay"><h1 class="caption__overlay__title">' + data[x].title + '</h1><p class="caption__overlay__content">' + data[x].description + '</p><div class="readmorecontainer"><a href="' + data[x].link + '"><div class="button green center"><p id="vmas">View More</p></div></a></div></div></a></li>';
        document.getElementById("addToMe").insertAdjacentHTML('afterbegin', lix);
      }
      else {

      }
      x++;
    }
    document.getElementById("addToMe").insertAdjacentHTML('beforeend', '<li class="gap"></li><li class="gap"></li><li class="gap"></li>');
}*/