
  $(document).ready(function(){
   $(document).on('change', '.c_homefilters-make select', function() {
    $(".c_homefilters-master select option").removeClass("c_homefilters-master-make");
    $(".c_homefilters-master-make-append").remove();
     $(".c_homefilters-master select option").removeClass("c_homefilters-master-model");
    $(".c_homefilters-master-model-append").remove();
    var make_arr = [];
    var make_val = $(this).val().trim();
    // console.log("c---", make_val);

    $(".c_homefilters-master select option").each(function(){
var master_val = $(this).attr("data-make");
      // console.log("Z---", master_val);
      if (make_val == master_val){
        $(this).addClass("c_homefilters-master-make");
      }
     });
    
      $(".c_homefilters-master-make").each(function(){
        var make_html = $(this).attr("data-model");
        // console.log("Z---", make_html);
         make_arr.push(make_html);
          });
    
    let make_arr_uniq = [...new Set(make_arr)];
     // console.log("Arr---", make_arr_uniq);
    for(var i = 0 ; i < make_arr_uniq.sort().length; i++){
      // console.log("T----", make_arr_uniq[i])
$(".c_homefilters-model select").append(`<option class="c_homefilters-master-make-append" value="${make_arr_uniq[i]}">${make_arr_uniq[i]}</option>`);
}
  });


      $(document).on('change', '.c_homefilters-model select', function() {
    $(".c_homefilters-master select option").removeClass("c_homefilters-master-model");
    $(".c_homefilters-master-model-append").remove();
    var model_arr = [];
    var model_val = $(this).val().trim();

    $(".c_homefilters-master select option").each(function(){
      var master_val = $(this).attr("data-model");
      if (master_val == model_val ){
        $(this).addClass("c_homefilters-master-model");
      }
     });

        // var total_year = '';
        var min_arr = [];
var max_arr = [];
      $(".c_homefilters-master-model").each(function(){
        var min_year = $(this).attr("year-min");
        var max_year = $(this).attr("year-max");
        var year = $(this).attr("data-year");        
        min_arr.push(min_year);
        max_arr.push(max_year);
                           for(var i = min_year ; i <= max_year; i++){
$(".c_homefilters-year select").append(`<option class="c_homefilters-master-model-append" value="${i}">${i}</option>`);
}
          });

    var arr_eachyear = [];
        $(".c_homefilters-year select .c_homefilters-master-model-append").each(function(){
var val = $(this).val();
          // console.log("c---", val);
          arr_eachyear.push(val);
           $(".c_homefilters-master-model-append").remove();
       });

        let arr_eachyear_uniq = [...new Set(arr_eachyear)];
                    for(var i = 0 ; i < arr_eachyear_uniq.sort().length; i++){
$(".c_homefilters-year select").append(`<option class="c_homefilters-master-model-append" value="${arr_eachyear_uniq[i]}">${arr_eachyear_uniq[i]}</option>`);
}
          
        
        console.log("min_arr--", min_arr, "max_arr--", max_arr);
        // $(".c_homefilters-main").attr("data-url", final_total_year);
        let min_arr_uniq = [...new Set(min_arr)];
         let max_arr_uniq = [...new Set(max_arr)];
        const min_arr_low = Math.min(...min_arr_uniq);
        const max_arr_high = Math.max(...max_arr_uniq);
         console.log("c---", min_arr_low," c--", max_arr_high);
//                     for(var i = min_arr_low ; i <= max_arr_high; i++){
// $(".c_homefilters-year select").append(`<option class="c_homefilters-master-model-append">${i}</option>`);
// }

  });

    $(document).on('change', '.c_homefilters-year select', function() {
var select_year = $(this).val();
      console.log("c===", select_year);

      var total_year = '';
      $(".c_homefilters-master-model").each(function(){
var year_range = $(this).attr("data-year-range");
        var year = $(this).attr("data-year");
         console.log("Range===", year_range, "year--", year);
        if (year_range.indexOf(select_year) != -1){
           var make = $(".c_homefilters-make select option:selected").val().trim();
        var model = $(".c_homefilters-model select option:selected").val().trim();
       total_year += "filter.p.m.custom.filter="+make+"|"+model+"|"+year+"&";
          console.log("filter===", year_range, "c---", year);
        }
        });

      var total_year_trim = total_year.trim();
        var final_total_year = total_year_trim.substring(0,total_year_trim.length - 1)
        console.log("Y--", final_total_year);
        $(".c_homefilters-main").attr("data-url", final_total_year);
      });

     $(document).on('change', '.c_homefilters-a select', function() {
       var filter = '';
          let error = false;
       // console.log("c---", final_filter);
         $(".c_homefilters-a select").each(function(){
var filter_val  = $(this).find("option:selected").val();
         if (filter_val != 'nofiltervaluee'){
       
         }
         else{
             error = true;
         }
         });
        if (!error){
           $(".c_homefilters-btn button").prop("disabled", false);;
            console.log("Submit---");
        }
        else{
           $(".c_homefilters-btn button").prop("disabled", true);
          console.log("Error---");
        }
        });
});

   $(document).on('click', '.c_homefilters-btn button', function() {
var urll = "/collections/all?" + $(this).closest(".c_homefilters-main").attr("data-url");
     window.location.href = urll;
     });


