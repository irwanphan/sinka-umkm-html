const docReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}  

const checkLogin = () => {
    const token = sessionStorage.getItem('token')
    if (!token) window.location.replace('./login.html')
    console.log(token)
    // return token
}

const login = () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")

    var raw = JSON.stringify({
        "no_hp": username,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://api.kolektif-umkm.turbin.id/api/login", requestOptions)
        .then(response => response.json())
        .then(responseJson => {
            // console.log(responseJson)
            const token = responseJson.token
            if (responseJson.success) {
                // console.log(token)
                sessionStorage.setItem('username', username)
                sessionStorage.setItem('token', token)
                // const checkToken = sessionStorage.getItem('token')
                // console.log(checkToken)
                window.location.replace('./index.html')
            } 
            return responseJson.token
        })
        .catch(error => console.log('error', error))
}

const logout = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")

    var requestOptions = {
        method: 'POST',
        headers: myHeaders
    };

    fetch("http://api.kolektif-umkm.turbin.id/api/logout", requestOptions)
        .then(response => {
            console.log(response)
            if (response.status == 200) {
                sessionStorage.removeItem('token')
                window.location.replace('./login.html')
            } 
            return response.token
        })
        .catch(error => console.log('error', error))
}

const fetchDaftarUMKM = () => {
    const token = sessionStorage.getItem('token')
    // console.log(token)
    
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    });

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    
    const hideLoader = () => {
        const loadingElement = document.getElementById('loading')
        loadingElement.remove()
    }

    const show = (data) => {
        let tableData = ''
        
        for (let r of data) {
            tableData += `<tr> 
                <td>${r.id} </td>
                <td>${r.user.nama}</td>
                <td>${r.nama_usaha}</td> 
                <td>
                    <button>atur</button>
                    <button class="danger">hapus</button>
                </td>          
            </tr>`;
        }
        // Setting innerHTML as tab variable
        document.getElementById("rowData").innerHTML = tableData;
    }

    const api_url = "http://api.kolektif-umkm.turbin.id/api/usaha"
    async function getapi(url) {

        // Storing response
        const response = await fetch(url, requestOptions)
        // Storing data in form of JSON
        var data = await response.json()
        console.log(data)
        if (data.status == 'Token is Expired') window.location.replace('./login.html')
        if (response) {
            hideLoader()
        }
        show(data);
    }
    getapi(api_url)
    
}
