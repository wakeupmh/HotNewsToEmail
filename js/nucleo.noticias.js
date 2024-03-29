const exPath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"; //your path to chrome.exe
const getNoticias = async() =>{
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
        await page.type('#RainLoopEmail', '<yourEmail>');
        await page.type('#RainLoopPassword', '<yourPassword>');
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
        await page.type('.ui-autocomplete-input', '<EmailToSend>');
        const data = new Date();
        await page.type('[data-bind="textInput: subject, hasFocus: subject.focused"]', 'Noticias do El País '+ ("0" + data.getDate()).substr(-2) + "/" + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear());
        await page.waitForSelector('#cke_1_contents');
        await page.click('#cke_1_contents');
        await page.type('#cke_1_contents', window.val);
        await page.waitFor(400);
        await page.waitForSelector('.button-send');
        await page.click('.button-send');
        await page.waitForSelector('div.modal.hide.b-compose.fade',{hidden:true});
        await browser.close();
    } catch (e) {
        console.log(e);
    }
};
