// global variables
var defaultColor, 
    open = false,
    duration  = 0.3,
    timing    = 'cubic-bezier(0.7, 0, 0.3, 1)',
    saveAsPNG = function(value) {
      saveSvgAsPng(document.getElementById("character"), value + ".png");
    },
    initializeLocalStorage = function() {
      if ( localStorage.getItem("checkHands")) {
        // detect ui left or right handed
        if ( localStorage.getItem("checkHands") === "leftHanded" ) {
          // switch to left handed
          $(".cp-holder").addClass("cp-right");
          $(".cp-holder").removeClass("cp-left");

          $(".categories").addClass("fl");
          $(".categories").removeClass("fr");

          $('.picker').minicolors({
            position: 'top right'
          });
          
          $("[data-action=switch-hands]").text("Switch to right handed");
        } else {
          // switch to right handed
          $(".cp-holder").addClass("cp-left");
          $(".cp-holder").removeClass("cp-right");

          $(".categories").addClass("fr");
          $(".categories").removeClass("fl");

          $('.picker').minicolors({
            position: 'top left'
          });
          
          $("[data-action=switch-hands]").text("Switch to left handed");
        }
      }
      if ( localStorage.getItem("rememberCategory")) {
        var rememberedClass = $(".categories .category[data-call=" + localStorage.getItem("rememberCategory") + "]");
        
        setTimeout(function() {
          rememberedClass.trigger("click");
        });
      }
      if ( localStorage.getItem("rememberDesign")) {
        $(".viewer").html(localStorage.getItem("rememberDesign"));
      }
    },
    rememberDesign = function() {
      localStorage.setItem("rememberDesign", $(".viewer").html());
    },
    appendPicker = function() {
      // some categories do not need color picker
      if ($(".head, .nose").hasClass("active")) {
        $('.cp-holder').empty();
        return false;
      }
      
      // add color picker to dom
      $('.cp-holder').empty().append('<input type="text" class="picker" data-opacty="1">');
      
      // detect if background is active
      if ($(".background").hasClass("active")) {
        defaultColor = tinycolor($("#background").css("fill")),
        defaultColor = defaultColor.toHexString();

        $('.picker').val(defaultColor).minicolors({
          format: 'hex',
          defaultValue: this.value,
          position: 'top left',
          change: function(value, opacity) {
            $("#background").css('fill', this.value);
            rememberDesign();
          }
        });
      }
      // detect if shoes is active
      else if ($(".bg-border").hasClass("active")) {
        defaultColor = tinycolor($("#bg-border").css("fill"));
        defaultColor = defaultColor.toHexString();

        $('.picker').val(defaultColor).minicolors({
          format: 'hex',
          defaultValue: this.value,
          position: 'top left',
          change: function(value, opacity) {
            $("#bg-border").css('fill', this.value);
            rememberDesign();
          }
        });
      } else if ($(".face").hasClass("active")) {
        $('.picker').val($(".viewer svg #head #face-color path").attr('fill')).minicolors({
          format: 'rgb',
          defaultValue: this.value,
          opacity: false,
          position: 'top left',
          change: function(value, opacity) {
            if ($("[data-call]").hasClass("active")) {
              $(".viewer svg #head #face-color path").attr('fill', this.value);
              rememberDesign();
            }
          }
        });
      } else if ($(".neck").hasClass("active")) {
        $('.picker').val($(".viewer svg #neck-color path").attr('fill')).minicolors({
          format: 'rgb',
          defaultValue: this.value,
          opacity: false,
          position: 'top left',
          change: function(value, opacity) {
            if ($("[data-call]").hasClass("active")) {
              $(".viewer svg #neck-color path").attr('fill', this.value);
              rememberDesign();
            }
          }
        });
      } else if ($(".rear-hair").hasClass("active")) {
        $('.picker').val($(".viewer svg #head #rear-hair #rear-hair-color path").attr('fill')).minicolors({
          format: 'rgb',
          defaultValue: this.value,
          opacity: true,
          position: 'top left',
          change: function(value, opacity) {
            if ($("[data-call]").hasClass("active")) {
              $(".viewer svg #head #rear-hair #rear-hair-color path").attr('fill', this.value);
              rememberDesign();
            }
          }
        });
      } else if ($(".front-hair").hasClass("active")) {
        $('.picker').val($(".viewer svg #head #front-hair #hair-color path").attr('fill')).minicolors({
          format: 'rgb',
          defaultValue: this.value,
          opacity: true,
          position: 'top left',
          change: function(value, opacity) {
            if ($("[data-call]").hasClass("active")) {
              $(".viewer svg #head #front-hair #hair-color path").attr('fill', this.value);
              rememberDesign();
            }
          }
        });
      } else if ($(".ears").hasClass("active")) {
        $('.picker').val($(".viewer svg #head #ears #ear-color path").attr('fill')).minicolors({
          format: 'rgb',
          defaultValue: this.value,
          opacity: true,
          position: 'top left',
          change: function(value, opacity) {
            if ($("[data-call]").hasClass("active")) {
              $(".viewer svg #head #ears #ear-color path").attr('fill', this.value);
              rememberDesign();
            }
          }
        });
      } else if ($(".eyebrows").hasClass("active")) {
        $('.picker').val($(".viewer svg #head #eyebrows #brow-color path").attr('fill')).minicolors({
          format: 'rgb',
          defaultValue: this.value,
          opacity: true,
          position: 'top left',
          change: function(value, opacity) {
            if ($("[data-call]").hasClass("active")) {
              $(".viewer svg #head #eyebrows #brow-color path").attr('fill', this.value);
              rememberDesign();
            }
          }
        });
      } else if ($(".eyes").hasClass("active")) {
        if (!$(".viewer svg #head #eyes .eye-color").is(":visible")) {
          // add color picker to dom
          $('.cp-holder').empty();
          return false;
        }
        $('.picker').val($(".viewer svg #head #eyes .eye-color path").attr('fill')).minicolors({
          format: 'rgb',
          defaultValue: this.value,
          opacity: false,
          position: 'top left',
          change: function(value, opacity) {
            if ($("[data-call]").hasClass("active")) {
              $(".viewer svg #head #eyes .eye-color path").attr('fill', this.value);
              rememberDesign();
            }
          }
        });
      } else if ($(".mouth").hasClass("active")) {
        if (!$(".viewer svg #head #mouth .mouth-color").is(":visible")) {
          // add color picker to dom
          $('.cp-holder').empty();
          return false;
        }
        $('.picker').val($(".viewer svg #head #mouth .mouth-color path").attr('fill')).minicolors({
          format: 'rgb',
          defaultValue: this.value,
          opacity: false,
          position: 'top left',
          change: function(value, opacity) {
            if ($("[data-call]").hasClass("active")) {
              $(".viewer svg #head #mouth .mouth-color path").attr('fill', this.value);
              rememberDesign();
            }
          }
        });
      } else if ($(".tshirt").hasClass("active")) {
        $('.picker').val($(".viewer svg #shirt-color path").attr('fill')).minicolors({
          format: 'rgb',
          defaultValue: this.value,
          opacity: false,
          position: 'top left',
          change: function(value, opacity) {
            if ($("[data-call]").hasClass("active")) {
              $(".viewer svg #shirt-color path").attr('fill', this.value);
              rememberDesign();
            }
          }
        });
      } else if ($(".collar").hasClass("active")) {
        $('.picker').val($(".viewer svg #collar-color path").attr('fill')).minicolors({
          format: 'rgb',
          defaultValue: this.value,
          opacity: false,
          position: 'top left',
          change: function(value, opacity) {
            if ($("[data-call]").hasClass("active")) {
              $(".viewer svg #collar-color path").attr('fill', this.value);
              rememberDesign();
            }
          }
        });
      } else {
        $('.picker').val($(".viewer svg #head #"+ $(".active[data-call]").attr("data-call") +" path").attr('fill')).minicolors({
          format: 'rgb',
          defaultValue: this.value,
          opacity: true,
          position: 'top left',
          change: function(value, opacity) {
            if ($("[data-call]").hasClass("active")) {
              $(".viewer svg #head #"+ $(".active[data-call]").attr("data-call") +" path").attr('fill', this.value);
              rememberDesign();
            }
          }
        });
      }
    },
    openInNewTab = function(url) {
      var a = document.createElement("a");
      a.target = "_blank";
      a.href = url;
      a.click();
    };

// resizable container
$('#mainSplitter').jqxSplitter({
  width: "auto",
  height: "100%",
  theme: "office",
  orientation: 'horizontal',
  panels: [{ size: "50%",collapsible:false },
           { size: "50%" }]
});

// save file from donate dialog
$("[data-class=setexport]").change(function() {
  // save as svg image
  $(".svg-export[data-class=setexport]").click(function() {
    $(".donatebanner").fadeOut();
    
    swal({
      title: 'File name below!',
      input: 'text',
      inputPlaceholder: ".svg is added on save",
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        blob = new Blob([ $(".viewer").html() ], {type: "text/html"});
        saveAs(blob, result.value + ".svg");

        swal(
          'Yay!',
          'You\'re was character successfully saved!',
          'success'
        );
      } else {
        swal(
          'Oops!',
          console.error().toString(),
          'error'
        );
      }
    });
  });
  
  // save as png image
  $(".png-export[data-class=setexport]").click(function() {
    $(".donatebanner").fadeOut();
    
    swal({
      title: 'File name below!',
      input: 'text',
      inputPlaceholder: ".png is added on save",
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        saveAsPNG(result.value);

        swal(
          'Yay!',
          'You\'re was character successfully saved!',
          'success'
        );
      } else {
        swal(
          'Oops!',
          console.error().toString(),
          'error'
        );
      }
    });
  });
  
  return false;
});

// hamburger menu settings
Moveit.put(first, {
    start: '0%',
    end: '14%',
    visibility: 1
});
Moveit.put(second, {
    start: '0%',
    end: '11.5%',
    visibility: 1
});
Moveit.put(middle, {
    start: '0%',
    end: '100%',
    visibility: 1
});

// hamburger menu click actions
$('.barstrigger').click(function() {
  if (!open) {
      Moveit.animate(first, {
        visibility: 1,
        start: '78%',
        end: '93%',
        duration: duration,
        delay: 0,
        timing: timing
      });
      Moveit.animate(middle, {
        visibility: 1,
        start: '50%',
        end: '50%',
        duration: duration,
        delay: 0,
        timing: timing
      });
      Moveit.animate(second, {
        visibility: 1,
        start: '81.5%',
        end: '94%',
        duration: duration,
        delay: 0,
        timing: timing
      });
      
      $(".menu .btn").delay().slideDown(300);
      $(".menu").fadeIn(300);
  } else {
    Moveit.animate(first, {
      visibility: 1,
      start: '0%',
      end: '14%',
      duration: duration,
      delay: 0,
      timing: timing
    });
    Moveit.animate(middle, {
      visibility: 1,
      start: '0%',
      end: '100%',
      duration: duration,
      delay: 0,
      timing: timing
    });
    Moveit.animate(second, {
      visibility: 1,
      start: '0%',
      end: '11.5%',
      duration: duration,
      delay: 0,
      timing: timing
    });

    $(".menu, .menu .btn").fadeOut();
  }
  open = !open;
});

// open donate dialog
$("[data-action=export]").click(function() {
  
  // before export ask to donate
  $("[data-class=setexport]").attr("class", this.className.toString()).trigger("change"); 
  
  // opens donate dialog
  $(".donatebanner").fadeIn();

  // close menu
  $(".barstrigger").trigger("click");
});

// switch hands button clicked
$("[data-action=switch-hands]").click(function() {
  // detect ui left or right handed
  if ( $(".cp-holder").hasClass("cp-left") ) {
    localStorage.setItem("checkHands", "leftHanded");
    
    // switch to left handed
    $(".cp-holder").addClass("cp-right");
    $(".cp-holder").removeClass("cp-left");
    
    $(".categories").addClass("fl");
    $(".categories").removeClass("fr");
    
    $('.picker').minicolors({
      position: 'top right'
    });
    
    this.textContent = "Switch to right handed";
  } else {
    localStorage.setItem("checkHands", "rightHanded");

    // switch to right handed
    $(".cp-holder").addClass("cp-left");
    $(".cp-holder").removeClass("cp-right");
    
    $(".categories").addClass("fr");
    $(".categories").removeClass("fl");
    
    $('.picker').minicolors({
      position: 'top left'
    });
    
    this.textContent = "Switch to left handed";
  }
  
  // close menu
  $(".barstrigger").trigger("click");
});

// clear saved character
$("[data-revert=design]").click(function() {
  swal({
    title: 'Revert to default design?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true
  }).then((result) => {
    if (result.value) {
      localStorage.clear("rememberDesign");
      location.reload(true);
    }
  })
});

// open buttons in a new tab
$("[data-href]").click(function() {
  openInNewTab( $("[data-href]").attr("data-href") );
});

// sets the color picker
appendPicker();

// save design via localStorage
initializeLocalStorage();

// if no category is remembered hide settings dialog text and only show background's
if (!localStorage.getItem("rememberCategory")) {
  $(".move-holder, .feature[data-display]").hide();
  $(".feature[data-display=background]").show();
}

// change categories
$(".categories .category").on("click", function() {
  // save active category
  localStorage.setItem("rememberCategory", $(this).attr("data-call"));
  
  // check if this category is already active
  if ($(this).hasClass("active")) {
    return false;
  }
  $("[data-toggle=settings-panel]").hide();
  
  // hide all other categories and the feature array
  $(".categories .category").removeClass("active");
  $(this).addClass("active");
  $(".feature[data-display]").hide();

  // show the active category
  $(".feature[data-display="+ $(this).attr("data-call") +"]").show();

  // check if this is background, border, tshirt, or collar category
  if($(this).hasClass("background") || $(this).hasClass("bg-border") || $(this).hasClass("tshirt") || $(this).hasClass("collar") || $(this).hasClass("neck") || $(this).hasClass("face")) {
    $(".move-holder").hide();
  } else {
    $(".move-holder").show();
  }
  
  // color picker should only be visible for some attributes
  appendPicker();
});

// change character attributes
$(".asset").on("click", function() {
  $(".viewer #character #head #" + $(".active[data-call]").attr("data-call")).html($(this).find("g#change").html());
  
  rememberDesign();
  appendPicker();
});

// Toggle scale and position `settings-panel`
$("[data-call=settings-panel]").click(function() {
  var category = $(".categories .category.active").attr("data-call");
  
  if ( $(".feature." + category).is(":visible") ) {
    $(".feature." + category).hide();
    $("[data-toggle=settings-panel]").show();
  } else {
    $(".feature." + category).show();
    $("[data-toggle=settings-panel]").hide();
  }
});

// adjust scale and position of character attributes
$("#scaleadj, #translatexadj, #translateyadj").on("change", function() {
  if ($(".active[data-call]").attr("data-call") === "head") {
    $(".viewer #character #" + $(".active[data-call]").attr("data-call")).attr("transform", "scale("+ $("#scaleadj").val() +") translate("+ $("#translatexadj").val() +", "+ $("#translateyadj").val() +")");
  } else {
    $(".viewer #character #head #" + $(".active[data-call]").attr("data-call")).attr("transform", "scale("+ $("#scaleadj").val() +") translate("+ $("#translatexadj").val() +", "+ $("#translateyadj").val() +")");
  }
  rememberDesign();
});
$("#scalerange").on("change", function() {
  $("#scaleadj").val(this.value).trigger("change");
});
$("#translatexrange").on("change", function() {
  $("#translatexadj").val(this.value).trigger("change");
});
$("#translateyrange").on("change", function() {
  $("#translateyadj").val(this.value).trigger("change");
});