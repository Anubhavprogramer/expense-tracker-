import {currentMonth, showData} from './addData.js';


const getdatabtn = document.getElementById('getdata');

getdatabtn.addEventListener('click', async (e) => {
    e.preventDefault();
    var time =  document.getElementById('time').value;
    
    if(!time){
        time = currentMonth();
    }

    time = formatDateString(time);
    const data = await showData( time);

    // console.log(data);
    if(data){
        data.forEach((doc) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${doc.date}</td>
            <td>${doc.description}</td>
            <td>${doc.income}</td>
            <td>${doc.expense}</td>
            `;
            document.getElementById('table-body').appendChild(tr);
        });
    }
    else{
        const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${" "}</td>
            <td>${" "}</td>
            <td>${" "}</td>
            <td>${" "}</td>
            `;
            document.getElementById('table-body').appendChild(tr);
    }
});

function formatDateString(dateString) {
    const [year, month] = dateString.split('-');
    const formattedMonth = month.length === 1 ? '0' + month : month; // Adds leading zero if needed
    return `${year}-${formattedMonth}`;
}

export {formatDateString};