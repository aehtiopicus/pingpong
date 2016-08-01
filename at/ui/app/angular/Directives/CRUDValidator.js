/* global angularApp */
(function() {
    'use strict';

    angularApp.factory('CRUDValidator',[function(){           
        return function(columns){

        function createError(id,value){
             return {'id':id,'value':value};   
        }
           
        function drawListOfErrors(errors){
                $.each(errors, function (index,value) {
                              drawErrorMessage(value.id,value.value);
                });         
        }
             
        function drawErrorMessage(id,value){
                var messageId='errorMessage_'+id;
                $('#'+messageId).text(value);
        }

        function validetaDates(object,errors,divId){
          var startDate =new Date(object.startDate);
          var finishDate=new Date(object.finishDate);
            if(finishDate.getTime() <= startDate.getTime()){
              errors.push(createError(divId+'_startDate','Fecha Invalida')); 
            }
        }

        function validateGCA(object,errors,divId){
         if(object.installmentCount < 2 &&  object.gcaPercent > 0){
            errors.push(createError(divId+'_gcaPercent','Para una cuota, el GCA debe ser cero.')); 
          }
        }

        var validations= [];
        $.each(columns, function (index,value) {
             if(value.validator!==undefined){
                validations[value.id]=value.validator;
                }
         });


          function validateAnInput(divId,objectToValidate,input){
            var errors=[];
            var inputName=$(input).attr('name');
            var propertyId = inputName.replace(divId+'_','');
            var validation=validations[propertyId];
            var viewValue=$(input).val();
       

            if($(input).is('select')){
              viewValue=$(input).find('option:selected').text();
            }
            if(validation!==undefined){
                  if(!validation.action(objectToValidate[propertyId])){
                     errors.push(createError(inputName,validation.message));  
                 }
            }else{
              if(viewValue.indexOf(objectToValidate[propertyId]) < 0) {
                 errors.push(createError(inputName,'Valor invalido'));
               }
            }
            drawErrorMessage(inputName,'');
            return errors;                                     
           }

          function isObjectValid(divId , objectToValidate){
                            var allErrors=[];
                            $('#'+divId+' input:text,'+'#'+divId+' select').each(function(){
                                var errors=validateAnInput(divId, objectToValidate, this);
                                allErrors=$.merge(allErrors,errors);
                                
                            });
                            validetaDates(objectToValidate,allErrors,divId);
                            validateGCA(objectToValidate,allErrors,divId);
                            drawListOfErrors(allErrors);
                            return allErrors.length===0;
               }


           function cleanInputValues(){
                                        $('#addRule input').each(function(){
                                            var inputName=$(this).attr('name');
                                            $(this).val('');
                                            drawErrorMessage(inputName,'');
                                        });
                                        $('#addRule select').each(function(){
                                            var inputName=$(this).attr('name');
                                            $(this).val('');
                                            drawErrorMessage(inputName,'');
                                        });
            }

            function validateInputOnBlur(divId,objectToValidate,input){
                               var errors=validateAnInput(divId, objectToValidate, input);
                               drawListOfErrors(errors);
            }  

            return {
              isObjectValid: isObjectValid,
              validateInputOnBlur: validateInputOnBlur,
              cleanInputValues: cleanInputValues
            };

        };

        }]);
})();   