$(document).ready(function() {

	/*===================================*/
    /*****=========wish tab==========*****/
    /*===================================*/

    var accum_years_wish;
    var income_wish;
    var income_usd_wish, income_year_usd_wish;
    var rate_wish;
    var addition, addition_usd_calcul;
    var addition_calcul, addition_usd;
    var accum_yield_calcul;
    var initial_deposit_usd;
    var sum_month, sum_month_usd;
    var nominal_yield, nominal_yield_full;

    /**----------age----------*/

    var age_now_wish = $("#age_now_wish");
    var age_aim_wish = $("#age_aim_wish");
    
    function calculate_age(){
        accum_years_wish = age_aim_wish.val().replace(',','.') - age_now_wish.val().replace(',','.');
        $("#accum_years_wish").val(accum_years_wish);
    }

    $(".age").each(function (index, item) {
        $(item).on('change', calculate_age);
    });

    /**----------income----------*/

        income_wish = $("#income_wish");
        rate_wish = $("#rate_wish");

    function calculate_income() {
        
        income_usd_wish = income_wish.val().replace(',','.') / rate_wish.val().replace(',','.');
        income_year_usd_wish = income_usd_wish * 12;

        $("#income_usd_wish").val(income_usd_wish);
        $("#income_year_usd_wish").val(income_year_usd_wish);
    }

     $(".income").each(function (index, item) {
        $(item).on('change', calculate_income);
    });
    
    /**----------addition----------*/

    addition = $("#addition");

    function calculate_addition() {

        addition_usd = addition.val().replace(',','.') / rate_wish.val().replace(',','.');
        addition_calcul = addition.val().replace(',','.');
        addition_usd_calcul = addition_usd;
        
        $("#addition_usd_calcul").val(addition_usd_calcul);
        $("#addition_usd").val(addition_usd);
        $("#addition_calcul").val(addition_calcul);
    };

   $(".addition").each(function (index, item) {
        $(item).on('change', calculate_addition);
    });

    /**----------share----------*/

    var share = $("#share");

    function calculate_share() {
     
        sum_month = income_wish.val().replace(',','.') * (share.val().replace(',','.') / 100);
        sum_month_usd = sum_month / rate_wish.val().replace(',','.');

        $("#sum_month").val(sum_month);
        $("#sum_month_usd").val(sum_month_usd);
    };

    $(".share").each(function (index, item) {
        $(item).on('change', calculate_share);
    });

    /**----------deposit----------*/

    var initial_deposit = $("#initial_deposit");

    function calculate_deposit() {      

        initial_deposit_usd = initial_deposit.val().replace(',','.') / rate_wish.val().replace(',','.');
        $("#initial_deposit_usd").val(initial_deposit_usd);
    };

    $(".deposit").each(function (index, item) {
        $(item).on('change', calculate_deposit);
    });

    /**----------yield----------*/

    var year_yield = $("#year_yield");
    var month_yield_accum, month_yield_accum_full;

    function calculate_yield() {
    
        accum_yield_calcul = year_yield.val().replace(',','.');
        nominal_yield_full = (Math.pow((1 + year_yield.val().replace(',','.') / 100), 1 / 12) - 1) * 100;
        nominal_yield = Math.round((nominal_yield_full) * 100) / 100;

        $("#nominal_yield").val(nominal_yield);
        $("#accum_yield_calcul").val(accum_yield_calcul);     

        month_yield_accum_full = (Math.pow((1 + accum_yield_calcul / 100), 1 / 12) - 1) * 100;
        month_yield_accum = Math.round(month_yield_accum_full * 100) / 100;
       
        $("#month_yield_accum").val(month_yield_accum);
           

        var result;
        var a = $("#income_increase").val().replace(',','.') / 100;
        var c;

        for (var i = 0; i <= 480; i++) {
            var b = Math.floor(i / 60);
            if (i === 0) {
                $('#myTable').append('<tr>' + '<th>' + 'Накопления (в долларах)' + '</th>' + '<th>' + 'Месяц' + '</th>' + '<th>' + 'Год' + '</th>' + '</tr>');
            }
            else if (i === 1) {
                result = sum_month_usd + initial_deposit_usd;

                $('#myTable').append('<tr>' + '<td>' + result + '</td>' + '<td>' + i + '</td>' + '<td>' + " " + '</td>' + '</tr>');
            }
            else if (i % 60 === 0) {

                if(i % 12 === 0){
                    c = i/12;
                }
                else{
                    c = " ";
                }
                result = result * (1 + nominal_yield_full / 100) + sum_month_usd * (Math.pow(1 + a, b)) + addition_usd;
                $('#myTable').append('<tr>' + '<td>' + result + '</td>' + '<td>' + i + '</td>' + '<td>' + c + '</td>' + '</tr>');

                if(i === 60){
                    accumulation_wish_5 = Math.round(result * 100) / 100;
                    $("#accumulation_wish_5").val(accumulation_wish_5);
                }
                else if(i === 120){
                    accumulation_wish_10 = Math.round(result * 100) / 100;
                    $("#accumulation_wish_10").val(accumulation_wish_10);
                }
                else if(i === 180){
                    accumulation_wish_15 = Math.round(result * 100) / 100;
                    $("#accumulation_wish_15").val(accumulation_wish_15);
                }
                else if(i === 240){
                    accumulation_wish_20 = Math.round(result * 100) / 100;
                    $("#accumulation_wish_20").val(accumulation_wish_20);
                }

            }
            else {
                if(i % 12 === 0){
                    c = i/12;
                }
                else{
                    c = " ";
                }
                result = result * (1 + nominal_yield_full / 100) + sum_month_usd * (Math.pow(1 + a, b));

                $('#myTable').append('<tr>' + '<td>' + result + '</td>' + '<td>' + i + '</td>' + '<td>' + c + '</td>' + '</tr>');
            }
        }
        $("th").css('background','#FFFFD9');
        $("th").css('text-align','center');
        $("tr:nth-child(60n+1)").css('background','#ddd');
    

    };

    $("#year_yield").on('change', calculate_yield);

	/*===================================*/
    /*****=========pension tab========*****/
    /*===================================*/

	var age_now, age_aim, accum_years;
    var income_usd, income_year_usd;
    var pension_yield, pension_yield_calcul;
    var rate, inflation, inflation_calcul;
    var today_income_usd;
    var today_income_usd_clone, today_income_usd_calcul_clone;
    var desire_month_income_inflation, desire_year_income_inflation, desired_income_calcul;
    var desire_month_income_inflation_full, desire_year_income_inflation_full, desired_income_calcul;
    var desire_month_income_inflation_calcul;
    var guarantee_amount, guarantee_amount_full;

    /**----------age----------*/
    
        age_now = $("#age_now");
        age_aim = $("#age_aim");


    function calculate_age_pens() {
        accum_years = age_aim.val().replace(',','.') - age_now.val().replace(',','.');
        $("#accum_years").val(accum_years);
        
    }

    $(".age_pens").each(function (index, item) {
        $(item).on('change', calculate_age_pens);
    });


 	/**----------income----------*/

    var income = $("#income");
        rate = $("#rate");

     function calculate_income_pens() {
        
        income_usd = income.val().replace(',','.') / rate.val().replace(',','.');
        income_year_usd = income_usd * 12;

        $("#income_usd").val(income_usd);
        $("#income_year_usd").val(income_year_usd);
    }

    $(".income_pens").each(function (index, item) {
        $(item).on('change', calculate_income_pens);
    });

    /**----------today----------*/

	var desired_income = $("#desired_income");

	function calculate_today_pens() {
		today_income_usd = desired_income.val().replace(',','.') * income_usd / 100;
		today_income_usd_clone = today_income_usd;
		desired_income_calcul = today_income_usd;
		today_income_usd_calcul_clone = today_income_usd;

		$("#today_income_usd").val(today_income_usd);
		$("#today_income_usd_clone").val(today_income_usd_clone);
		$("#desired_income_calcul").val(desired_income_calcul);
		$("#today_income_usd_calcul_clone").val(today_income_usd_calcul_clone);
	}

	$(".today").each(function (index, item) {
        $(item).on('change', calculate_today_pens);
    });

    /**----------yield----------*/

    var month_yield, month_yield_full;  
    var month_yield_pension; 
       
    var desire_year_income_inflation_calcul, desire_year_income_inflation_calcul_full;
    var guarantee_amount_calcul;   
        
    function calculate_yield_pens() {
        pension_yield = $("#pension_yield");
        inflation = $("#inflation");

        pension_yield_calcul = pension_yield.val().replace(',','.');
        month_yield_full = (Math.pow((1 + pension_yield.val().replace(',','.') / 100), 1 / 12) - 1) * 100;
        month_yield = Math.round(month_yield_full * 100) / 100;
        month_yield_pension = Math.round(((Math.pow((1 + pension_yield_calcul / 100), 1 / 12) - 1) * 100) * 100) / 100;

        desire_month_income_inflation_full = today_income_usd * (Math.pow((1 + inflation.val().replace(',','.') / 100), accum_years));
        desire_month_income_inflation = Math.round(desire_month_income_inflation_full * 100) / 100;
        desire_year_income_inflation_full = desire_month_income_inflation_full * 12;
        desire_year_income_inflation = Math.round(desire_year_income_inflation_full * 100) / 100;
        guarantee_amount_full = desire_year_income_inflation / (pension_yield.val().replace(',','.') / 100);
        guarantee_amount = Math.round(guarantee_amount_full);

        desire_month_income_inflation_calcul_full = desire_month_income_inflation_full;
        desire_month_income_inflation_calcul = desire_month_income_inflation;
        desire_year_income_inflation_calcul_full = desire_month_income_inflation_calcul_full * 12;
        desire_year_income_inflation_calcul = Math.round(desire_year_income_inflation_calcul_full * 100) / 100;
        guarantee_amount_calcul = Math.round(desire_year_income_inflation_calcul / (pension_yield_calcul / 100));
        

        $("#month_yield").val(month_yield);
        $("#pension_yield_calcul").val(pension_yield_calcul);
        $("#month_yield_pension").val(month_yield_pension);
        $("#desire_month_income_inflation").val(desire_month_income_inflation);
        $("#desire_year_income_inflation").val(desire_year_income_inflation);
        $("#guarantee_amount").val(guarantee_amount);
        $("#desire_month_income_inflation_calcul").val(desire_month_income_inflation_calcul);
        $("#desire_year_income_inflation_calcul").val(desire_year_income_inflation_calcul);
        $("#guarantee_amount_calcul").val(guarantee_amount_calcul);

        var accum_pension_table;
        var balance_pension_table;
        var result_pension;

        for (var i = 0; i <= 50; i++) {

            if (i === 0) {
                $('#myTable_pension').append('<tr>' + '<th>' + 'Год накоплений' + '</th>' + '<th>' + 'Возраст' + '</th>' + '<th>' + 'Накопления на момент ухода на пенсию' + '</th>' + '<th>' + 'Ежегодный процентый доход' + '</th>' + '<th>' + 'Фиксированные годовые затраты в период пенсии' + '</th>' + '<th>' + 'Ежегодный остаток' + '</th>' +'</tr>');
            }

            else if (i === 1) {

                accum_pension_table = guarantee_amount_full;
                balance_pension_table = accum_pension_table + accum_pension_table * (pension_yield.val().replace(',','.')/100) - desire_year_income_inflation;

                $('#myTable_pension').append('<tr>' + '<td>' + accum_years + '</td>' + '<td>' + age_aim.val().replace(',','.') + '</td>' + '<td>' + accum_pension_table + '</td>' + '<td>' + accum_pension_table * (pension_yield.val().replace(',','.')/100) + '</td>' + '<td>' + desire_year_income_inflation + '</td>' + '<td>' + balance_pension_table + '</td>' + '</tr>');
                result_pension = balance_pension_table;
            }

            else {
                accum_pension_table = result_pension;
                balance_pension_table = accum_pension_table + accum_pension_table * (pension_yield.val().replace(',','.')/100) - desire_year_income_inflation;

                $('#myTable_pension').append('<tr>' + '<td>' + ++accum_years + '</td>' + '<td>' + (+age_aim.val().replace(',','.') - 1 + i) + '</td>' + '<td>' + accum_pension_table + '</td>' + '<td>' + accum_pension_table * (pension_yield.val().replace(',','.')/100) + '</td>' + '<td>' + desire_year_income_inflation + '</td>' + '<td>' + balance_pension_table + '</td>' + '</tr>');
                result_pension = balance_pension_table;
            }

        }
        $("th").css('background','#FFFFD9');
        $("th").css('text-align','center');
        $("tr:nth-child(60n+1)").css('background','#ddd');
    
    }

    $(".yield").each(function (index, item) {
        $(item).on('change', calculate_yield_pens);
    });

    /*===================================*/
    /**=========calculation tab==========*/
    /*===================================*/

    var accum_years_calcul;
    var income_calcul;
    var income_usd_calcul, income_year_usd_calcul;
    var rate_calcul, sum_month_usd_calcul;
    var initial_deposit_usd_calcul;
    var age_aim_calcul;

    /**----------age----------*/

    var age_now_calcul = $("#age_now_calcul");
        age_aim_calcul = $("#age_aim_calcul");

   function calculate_age_calc() {
        accum_years_calcul = age_aim_calcul.val().replace(',','.') - age_now_calcul.val().replace(',','.');

        $("#accum_years_calcul").val(accum_years_calcul);
    }

    $(".age_calc").each(function (index, item) {
        $(item).on('change', calculate_age_calc);
    });

     /**----------income----------*/

    
    rate_calcul = $("#rate_calcul");

    function calculate_income_calc(){
    	income_calcul = $("#income_calcul");
        
        income_usd_calcul = income_calcul.val().replace(',','.') / rate_calcul.val().replace(',','.');
        income_year_usd_calcul = income_usd_calcul * 12;

        $("#income_usd_calcul").val(income_usd_calcul);
        $("#income_year_usd_calcul").val(income_year_usd_calcul);
    }

    $(".income_calc").each(function (index, item) {
        $(item).on('change', calculate_income_calc);
    });

    /**----------addition----------*/

    

    /**----------share----------*/

    var sum_month_calcul ;
    var share_calcul = $("#share_calcul");

    function calculate_share_calc() {
        
        sum_month_calcul = income_calcul.val().replace(',','.') * (share_calcul.val().replace(',','.') / 100);
        sum_month_usd_calcul = sum_month_calcul / rate_calcul.val().replace(',','.');

        $("#sum_month_calcul").val(sum_month_calcul);
        $("#sum_month_usd_calcul").val(sum_month_usd_calcul);
    }

    $(".share_calc").each(function (index, item) {
        $(item).on('change', calculate_share_calc);
    });

    /**----------deposit----------*/

    var initial_deposit_calcul = $("#initial_deposit_calcul");

    function calculate_deposit_calc() {

        initial_deposit_usd_calcul = initial_deposit_calcul.val().replace(',','.') / rate_calcul.val().replace(',','.');

        $("#initial_deposit_usd_calcul").val(initial_deposit_usd_calcul);

        var x;
        x = accum_years_calcul * 12;


        var result_calcul;
        var a_calcul = $("#income_increase_calcul").val().replace(',','.') / 100;


        for (var i = 0; i <= 480; i++) {
            var b_calcul = Math.floor(i / 60);
            var c;

            if (i === 0) {
                $('#myTable_calcul').append('<tr>' + '<th>' + 'Накопления (в долларах)' + '</th>' + '<th>' + 'Месяц' + '</th>' + '<th>' + 'Год' + '</th>' + '</tr>');
            }
            else if (i === 1) {
                result_calcul = sum_month_usd_calcul + initial_deposit_usd_calcul;

                $('#myTable_calcul').append('<tr>' + '<td>' + result_calcul + '</td>' + '<td>' + i + '</td>' + '<td>' + " " + '</td>' + '</tr>');
            }
            else if (i % 60 === 0) {
                if (i % 12 === 0) {
                    c = i / 12;
                }
                else {
                    c = " ";
                }
                result_calcul = result_calcul * (1 + month_yield_accum_full / 100) + sum_month_usd_calcul * (Math.pow(1 + a_calcul, b_calcul)) + addition_usd_calcul;
                $('#myTable_calcul').append('<tr>' + '<td>' + result_calcul + '</td>' + '<td>' + i + '</td>' + '<td>' + c + '</td>' + '</tr>');
                if (i === 120) {
                    accumulation_10 = Math.round(result_calcul * 100) / 100;
                    $("#accumulation_10").val(accumulation_10);
                }
                else if (i === 180) {
                    accumulation_15 = Math.round(result_calcul * 100) / 100;
                    $("#accumulation_15").val(accumulation_15);
                }
                else if (i === 240) {
                    accumulation_20 = Math.round(result_calcul * 100) / 100;
                    $("#accumulation_20").val(accumulation_20);
                }
                else if (i === 300) {
                    accumulation_25 = Math.round(result_calcul * 100) / 100;
                    $("#accumulation_25").val(accumulation_25);
                }
                else if (i === 360) {
                    accumulation_30 = Math.round(result_calcul * 100) / 100;
                    $("#accumulation_30").val(accumulation_30);
                }
                else if (i === 420) {
                    accumulation_35 = Math.round(result_calcul * 100) / 100;
                    $("#accumulation_35").val(accumulation_35);
                }
                else if (i === 480) {
                    accumulation_40 = Math.round(result_calcul * 100) / 100;
                    $("#accumulation_40").val(accumulation_40);
                }
            }
            else {
                if (i % 12 === 0) {
                    c = i / 12;
                }
                else {
                    c = " ";
                }
                result_calcul = result_calcul * (1 + month_yield_accum_full / 100) + sum_month_usd_calcul * (Math.pow(1 + a_calcul, b_calcul));

                $('#myTable_calcul').append('<tr>' + '<td id="' + i + '">' + result_calcul + '</td>' + '<td>' + i + '</td>' + '<td>' + c + '</td>' + '</tr>');
            }
        }
        y = $('#' + x).text();

        $("th").css('background', '#FFFFD9');
        $("th").css('text-align', 'center');
        $("tr:nth-child(60n+1)").css('background', '#ddd');

        var accum_table;
        var balance_table;
        var result_pension_calcul;

        for (var i = 0; i <= 50; i++) {

            if (i === 0) {
                $('#myTable_pension_calcul').append('<tr>' + '<th>' + 'Год накоплений' + '</th>' + '<th>' + 'Возраст' + '</th>' + '<th>' + 'Накопления на момент ухода на пенсию' + '</th>' + '<th>' + 'Ежегодный процентый доход' + '</th>' + '<th>' + 'Фиксированные годовые затраты в период пенсии' + '</th>' + '<th>' + 'Ежегодный остаток' + '</th>' + '</tr>');
            }

            else if (i === 1) {
                accum_table = +y;
                balance_table = accum_table + accum_table * (pension_yield_calcul / 100) - desire_year_income_inflation_calcul;

                $('#myTable_pension_calcul').append('<tr>' + '<td>' + accum_years_calcul + '</td>' + '<td>' + age_aim_calcul.val().replace(',','.') + '</td>' + '<td>' + accum_table + '</td>' + '<td>' + accum_table * (pension_yield_calcul / 100) + '</td>' + '<td>' + desire_year_income_inflation_calcul_full + '</td>' + '<td>' + balance_table + '</td>' + '</tr>');
                result_pension_calcul = balance_table;

            }

            else {
                accum_table = result_pension_calcul;
                balance_table = accum_table + accum_table * (pension_yield_calcul / 100) - desire_year_income_inflation_calcul;

                $('#myTable_pension_calcul').append('<tr>' + '<td>' + ++accum_years_calcul + '</td>' + '<td>' + (+age_aim_calcul.val().replace(',','.') - 1 + i) + '</td>' + '<td>' + accum_table + '</td>' + '<td>' + accum_table * (pension_yield_calcul / 100) + '</td>' + '<td>' + desire_year_income_inflation_calcul_full + '</td>' + '<td>' + balance_table + '</td>' + '</tr>');
                result_pension_calcul = balance_table;
            }
        }
        $("th").css('text-align', 'center');
        $("tr:nth-child(60n+1)").css('background', '#ddd');
    }

    $('#initial_deposit_calcul').on('change', calculate_deposit_calc);



});
















