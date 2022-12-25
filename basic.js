var jpdbBaseURL="http://api.login2explore.com:5577";
 var jpdbIML="/api/iml";
 var jpdbIRL="/api/irl";
 var empDBName= "STUDENT-TABLE";
 var EmpRelationName="SCHOOL-DB";
 var connToken= "90938351|-31949271896140011|90952445";

 

  

 // Validating Form Data

 function validateAndGetFormData() {
    var empIdVar = $("#empId").val();

    if (empIdVar === "") {
        alert("Employee ID Required Value");
        $("#empId").focus();
        return "";
    }
    var empNameVar = $("#empName").val();
    if (empNameVar === "") {
        alert("Employee Name is Required Value");
        $("#empName").focus();
        return "";
    }
    var empSalaryVar = $("#empSalary").val();
    if (empSalaryVar === "") {
        alert("Employee Salary is Required Value");
        $("#empSalary").focus();
        return "";
    }
    
    var empHraVar = $("#empHra").val();
    if (empHraVar === "") {
        alert("Employee HRA is Required Value");
        $("#empHra").focus();
        return "";
    }
    
    var empDaVar = $("#empDa").val();
    if (empDaVar === "") {
        alert("Employee DA is Required Value");
        $("#empDa").focus();
        return "";
    }


    var empDeductionVar = $("#empDeduction").val();
    if (empDeductionVar === "") {
        alert("Employee Deduction is Required Value");
        $("#empDeduction").focus();
        return "";
    }

    
    
    var jsonStrObj = {
        empId: empIdVar,
        empName: empNameVar,
        empSalary: empSalaryVar,
        empHra:empHraVar,
        empDA:empDaVar,
        empDeduction:empDeductionVar
    };
    return JSON.stringify(jsonStrObj);
}




function saveRecNo2LS(jsonObj){
    var lvData= JSON.parse(jsonObj.data);
    console.log(lvData);
    localStorage.setItem("recno", lvData.rec_no);
}





// fill Data

function fillData(jsonObj){
    console.log("filldata",jsonObj);
    saveRecNo2LS(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    console.log("record",record);
    $("#empName").val(record.empName);
    $("#empSalary").val(record.empSalary);
    $("#empHra").val(record.empHra);
    $("#empDa").val(record.empDA);
    $("#empDeduction").val(record.empDeduction);

}





function getEmpIdAsJson(){
    var empId=$("#empId").val();
    var jsonStr={
        empId:empId
    };
    return JSON.stringify(jsonStr);
}





// getting Emp

function getEmp(){
    var empIdJsonObj = getEmpIdAsJson();
    var getRequest= createGET_BY_KEYRequest(connToken, empDBName, EmpRelationName, empIdJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL)
    jQuery.ajaxSetup({ async: true });
    if(resJsonObj.status===400){
        $("#empSave").prop("disabled",false);
        $("#empReset").prop("disabled",false);
        $("#empName").focus();
    }else if(resJsonObj.status===200){
        $("#empId").prop("disabled",true)
        fillData(resJsonObj);

        $("#empChange").prop("disabled",false);
        $("#empReset").prop("disabled",false);
        $("#empName").focus();
    }

}









// changing the data

function changeEmployeess(){
    $("#empChange").prop("disabled", true);
    var jsonChg = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, empDBName, EmpRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({ async: false });
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML)
    jQuery.ajaxSetup({ async: true });
    console.log(resJsonObj);
    resetEmployees();
    $("#empId").focus();


    

}



    // Resetting the Form

function resetEmployees() {
    $("#empId").val("");
    $("#empName").val("");
    $("#empSalary").val("");
    $("#empHra").val("");
    $("#empDa").val("");
    $("#empDeduction").val("");
    $("#empId").prop("disabled",false);
    $("#empSave").prop("disabled",true);
    $("#empChange").prop("disabled",true);
    $("#empReset").prop("disabled",true);
    $("#empId").focus();
}
function saveEmployees() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }

    // Using JPDB to create request

    var putReqStr = createPUTRequest(connToken,jsonStr, empDBName, EmpRelationName);
    console.log(putReqStr);
    jQuery.ajaxSetup({ async: false });

    // Executing The request(through JPDB ).

    var resJsonObj = executeCommandAtGivenBaseUrl(putReqStr,jpdbBaseURL, jpdbIML);
    console.log(resJsonObj);
    alert(JSON.stringify(resJsonObj));   
    jQuery.ajaxSetup({ async: true });

    // Calling reset function
    
    resetEmployees();
    $("#empId").focus();
}
