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
            
        })
            // const token = response.token
            // if (response.status == 200) {
            //     localStorage.setItem('token', token)
            //     console.log('asd')
            // } 
        .catch(error => console.log('error', error))
}



const fetchDaftarUMKM = () => {
    const api_url = "http://api.kolektif-umkm.turbin.id/api/usaha"
    async function getapi(url) {
        // Storing response
        const response = await fetch(url);
        // Storing data in form of JSON
        var data = await response.json();
        console.log(data);
        // if (response) {
        //     hideloader();
        // }
        // show(data);
    }
    getapi(api_url)
}