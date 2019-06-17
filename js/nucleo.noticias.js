const getNoticias = async() =>{
    let exPath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: exPath
    });
    const page = await browser.newPage();
    await page.goto(`https://brasil.elpais.com`);

    request('https://brasil.elpais.com/').then(response => {
        window.val = 'Notícias:\n\n';
        for (let i = 0; i < 10; i++) {
            val += (i+1)+' - ' + response[i].title + '.\n\n';
        }
        enviaNoticias();
    });
    await browser.close();
};

const enviaNoticias = async() => {
    console.log(window.val);
    let exPath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: exPath
    });
    const page = await browser.newPage();
    await page.goto('https://webmail.backsite.com.br/');
    await page.waitForNavigation({
        waitUntil: 'load'
    });
    try{
        await page.type('#RainLoopEmail', 'desenvolvimento@backsite.com.br');
        await page.type('#RainLoopPassword', 'backsite@desenv');
        await page.click('button.btn');
    }catch(e){
        console.log(e);
    }
    await page.waitForNavigation({
        waitUntil: 'load'
    });
    try {
        await page.waitForSelector('.buttonCompose');
        await page.click('.buttonCompose');
        await page.type('.ui-autocomplete-input', 'emersonrios@gmail.com');
        const data = new Date();
        await page.type('[data-bind="textInput: subject, hasFocus: subject.focused"]', 'Noticias do El País '+ ("0" + data.getDate()).substr(-2) + "/" + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear());
        // await page.waitFor(4000);
        await page.waitForSelector('#cke_1_contents');
        await page.click('#cke_1_contents');
        // await page.waitFor(4000);
        await page.type('#cke_1_contents', window.val);
        await page.waitFor(400);
        await page.waitForSelector('.button-send');
        await page.click('.button-send');
        // await page.waitFor(4000);
        await page.waitForSelector('div.modal.hide.b-compose.fade',{hidden:true});
        await browser.close();
        await document.getElementById("closeManchetes").click();
    } catch (e) {
        console.log(e);
    }
};