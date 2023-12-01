// utility functions
// 1. utility function get DOM Elements to string
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// initial value count the parameters
let addedParamCount  = 0;

// parameters box hide
let parametersBox = document.getElementById('parametersBox')
// console.log(document.getElementById('parametersBox'))
parametersBox.style.display = "none"

// if user click on param box, hide the json box
let paramsRadio = document.getElementById("paramsRadio")
paramsRadio.addEventListener('click',()=>{
    document.getElementById("requestJsonBox").style.display = "none"
    document.getElementById("parametersBox").style.display = "block"
})

// if user click on JSON box, hide the param box
let jsonRadio = document.getElementById("jsonRadio")
jsonRadio.addEventListener('click',()=>{
    document.getElementById("requestJsonBox").style.display = "block"
    document.getElementById("parametersBox").style.display = "none"
})

// if user click on + button, add more parameters
let addParams = document.getElementById("addParams")
addParams.addEventListener("click",()=>{
    let params = document.getElementById("params")
    let string = ` <div class="row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter parameter  ${addedParamCount + 2} key ">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter parameter  ${addedParamCount + 2} value ">
                    </div>
                    <button class="btn btn-primary col-sm-2 deleteParam">-</button>
                </div>`
    // convert to element string to Dom
    let paramElement = getElementFromString(string);
    // console.log(paramElement)
    params.appendChild(paramElement);
    let deleteParam = document.getElementsByClassName("deleteParam")
    for(item of deleteParam){
        item.addEventListener("click",(e)=>{
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})

//  if user click the submit button
let submit = document.getElementById("submit")
submit.addEventListener('click',()=>{
    // console.log(document.getElementById("responseJsonText").value)
    document.getElementById("responseJsonText").value = "Please Wait"
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // if user has used params option i.e. request type is params
    if(contentType == "params"){
        console.log(contentType)
        data = {};
        for(let i = 0; i < addedParamCount + 1; i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined){
                let key = document.getElementById('parameterKey' + (i+1)).value;
                let value = document.getElementById('parameterValue' + (i+1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data)
    }else{
        data = document.getElementById("requestJsonText").value;
    }

    console.log('Url is', url)
    console.log('requestType is', requestType)
    console.log('contentType is', contentType)
    console.log('data is', data)

    // if the request type is get, invoke the fetch api to create a post request..
    if(requestType == "GET"){
        fetch(url,{
            method : "GET",
        })
        .then(response => response.text())
        .then((text)=>{
            document.getElementById("responseJsonText").value = text;
        })
    }else{
        fetch(url,{
            method : "POST",
            body : data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.text())
        .then((text)=>{
            document.getElementById("responseJsonText").value = text;
        })
    }

})