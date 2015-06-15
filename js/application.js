
$(document).ready(function() {

    $(".menu-icon").click(function() {
        $(".menu").addClass("is-active");
    });

    $(".close-menu").click(function() {
        $(".menu").removeClass("is-active");
    });

    $(".dropdown").click(function() {
        $(this).toggleClass("is-active");
    });

    buildLayout();

    $(window).resize(function() {
        buildLayout();
    });

    function setGridHeight() {
        //calculate the height of the grid
        var lastBox = $(".box").last();    
        var minHeightGrid = $(lastBox).position().top + $(lastBox).outerWidth() + 20;
        $(".grid").css("height", minHeightGrid);
    }

    function buildLayout() {
        // ------------ Build layout -----------
        var boxes = $(".box");
        var widthGrid = $(".grid").outerWidth();

        var initialLeft = 40;
        var initialTop = 80;
        var sizeColumnAndMargin = 220;
        var margin = 20;

        var numColumns = 0;
        var numRows = 0;
        var boxCounter = 0;

        var arrayPosColumns = [];
            
        setColumnsRowsCoordinates();
        orderBoxes();
        setGridHeight();
        
        function setBox(box, top, left) {       
            $(box).css("top", top);        
            $(box).css("left", left);
        } 

        function setColumnsRowsCoordinates() {
            numColumns = parseInt((widthGrid - initialLeft) / sizeColumnAndMargin);
            numRows = Math.ceil(boxes.length / numColumns);
            //set the array of LEFT coordinates for the columns
            for(var i = 0; i < numColumns; i++) {
                var left = (i == 0) ? initialLeft : (arrayPosColumns[i-1] + sizeColumnAndMargin);
                arrayPosColumns.push(left);
            }
        }
        
        function orderBoxes() {
            var arrayNextTops = [];  //will save the next TOP coordinates for next Row
            for(var r = 0; r < numRows; r++) {
                for(var i = 0; i < numColumns; i++) {
                    var left = (i == 0) ? initialLeft : arrayPosColumns[i];
                    var top = (r == 0) ? initialTop : arrayNextTops[i];       
                    setBox(boxes[boxCounter], top, left);
                    
                    var nextTop = (r == 0) ?
                                    $(boxes[boxCounter]).outerHeight() + margin + initialTop
                                    : $(boxes[boxCounter]).outerHeight() + margin + top;

                    arrayNextTops[i] = nextTop;            
                    boxCounter++;
                }    
            }
        } 
    }
});    

