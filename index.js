function eSign() {
    if (document.getElementById("sign-submit-button").innerText == "SUBMIT") {
        markAsSigned();
    } else {
        document.getElementById("signature").style.visibility = 'visible';
        document.getElementById("sign-submit-button").innerText = 'SUBMIT';
    }
}

function getName() {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var theUrl = "https://prod-64.westus.logic.azure.com:443/workflows/0ebfaf5081c74f86a30def981464e87c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=D9DoRlvkh9Rsi1c72CqOMv9W-u3RLQIpYAkkwFroFrk";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader("Accept", "application/json");
    xmlhttp.send(
        JSON.stringify({
            "guid": window.location.search.split("=")[1]
        })
    );

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            var response = JSON.parse(xmlhttp.responseText);
            if (xmlhttp.status === 200) {
                // console.log('successful');
                document.getElementsByClassName('employee-name')[0].innerText = response.Name;
                document.getElementsByClassName('employee-name')[1].innerText = response.Name;

                document.getElementsByClassName('loader')[0].style.display = 'none';
                document.getElementsByClassName('overlay')[0].style.display = 'none';

                document.getElementById('today-date').innerText = new Date().toLocaleDateString(
                    "en-US", { year: 'numeric', month: 'long', day: 'numeric' }
                );

                if (response.Name && response.Name.length > 0) {
                    document.getElementById('esign-button').style.pointerEvents = 'all';
                }
            } else {
                // console.log('failed');
            }
        }
    }
}

function markAsSigned() {
    document.getElementsByClassName('loader')[0].style.display = 'block';
    document.getElementsByClassName('overlay')[0].style.display = 'block';

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var theUrl = "https://prod-58.westus.logic.azure.com:443/workflows/804d757c9d134e93a0555cdef2f771b6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7vs-S7m4N2rhbmgAAe43U8IVyprzYwoSWDiwy-aYPRk";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader("Accept", "application/json");
    xmlhttp.send(
        JSON.stringify({
            "guid": window.location.search.split("=")[1]
        })
    );

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            var response = JSON.parse(xmlhttp.responseText);
            if (xmlhttp.status === 200) {
                // console.log('successful');

                document.getElementsByClassName('loader')[0].style.display = 'none';
                document.getElementsByClassName('overlay')[0].style.display = 'none';

                document.getElementById('sign-submit-button').innerText = "THANKS!";
                document.getElementById('esign-button').style.pointerEvents = 'none';
            } else {
                // console.log('failed');
            }
        }
    }
}

getName();