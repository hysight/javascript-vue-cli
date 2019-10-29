/*
* @Author: baoer
* @Date:   2018-11-29 15:35:24
* @Last Modified by:   baoer
* @Last Modified time: 2018-11-29 15:48:03
*/


export function fetchProtect(url,parm){

	!parm && (parm = {});
    !parm.headers && (parm.headers = {});
    parm.headers = Object.assign(parm.headers);
    
    return fetch( url,parm ).then((response )=>{

    	if (response.status >= 200 && response.status < 300 ) {

    		return response;

    	}else {

    		console.log('-------------err');

    	}

    }).then((response)=>{

    	return response.json();


    }).catch((error) => {
            
            console.info('%后台返回数据失败: ' + error, 'background-color: #000; color: red; padding: 5px;');
            
       	});


}
       

                

