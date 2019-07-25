var sqldb=openDatabase('TicariDB',1.0,'ALisveris Sitesi',20*1024*1024)
sqldb.transaction(function(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS Kullanicilar (id INTEGER PRIMARY KEY, Name varchar(50), UserName varchar(50), Email varchar(50), Password varchar(50))',[],function(){
        console.log("Kullanici Tablosu oluşturuldu");
    });
    tx.executeSql('CREATE TABLE IF NOT EXISTS Urunler (UrunID INTEGER PRIMARY KEY, UrunAdi varchar(50), UrunFiyat varchar(50), ResimYolu varchar(50))',[],function(){
        console.log("Urunler Tablosu Oluşturuldu");
    });
    tx.executeSql('CREATE TABLE IF NOT EXISTS Sepet(SepetID INTEGER PRIMARY KEY, UrunID INTEGER,UrunAdi varchar(50), UrunAdet INTEGER, Tutar INTEGER)',[],function(){
        console.log("Sepet Tablosu Oluşturuldu");
    });
    
})
var Ticaret={
    db:openDatabase('TicariDB',1.0,'ALisveris Sitesi',20*1024*1024),
    // create:function(){
    //     this.db.transaction(function(tx){
    //         tx.executeSql('CREATE TABLE IF NOT EXISTS Kullanicilar (id INTEGER PRIMARY KEY, Name varchar(50), UserName varchar(50), Email varchar(50), Password varchar(50))',[],function(){
    //             console.log("Kullanici Tablosu oluşturuldu");
    //         });
    //         tx.executeSql('CREATE TABLE IF NOT EXISTS Urunler (UrunID INTEGER PRIMARY KEY, UrunAdi varchar(50), UrunFiyat varchar(50), ResimYolu varchar(50))',[],function(){
    //             console.log("Urunler Tablosu Oluşturuldu");
    //         });
    //         tx.executeSql('CREATE TABLE IF NOT EXISTS Sepet(SepetID INTEGER PRIMARY KEY, UrunID INTEGER,UrunAdi varchar(50), UrunAdet INTEGER, ToplamFiyat INTEGER)',[],function(){
    //             console.log("Sepet Tablosu Oluşturuldu");
    //         });
    //     })
    // },
    Login:function(tablename,UserName,Password,callback){
        this.db.transaction(function(tx){
            tx.executeSql('SELECT * FROM '+tablename+' WHERE UserName=? AND Password=?',[UserName,Password], function(islem,sonuc){
                var resultarray=[]
                var array=sonuc.rows
                for(var i=0; i<array.length; i++){
                    resultarray.push(array[i]);
                }
                callback(resultarray);
            });
        });
    },

    insert:function(tablename,colunm,getdata,value){
        this.db.transaction(function (tx){
            tx.executeSql('INSERT INTO '+tablename+' ('+colunm+') VALUES ('+getdata+')', value);
            })
    },
    
}

    var LoginBtn=document.querySelector("#login_btn");
    var UserNameinput=document.querySelector("#UserGiris");
    var Passwordinput=document.querySelector("#PasswordGiris");
    var Kaydetbtn=document.querySelector("#save_btn");
    var GerAdinput=document.querySelector("#GercekAd");
    var KulAdinput=document.querySelector("#KulAdi");
    var Emailinput=document.querySelector("#KullMail");
    var Sifreinput=document.querySelector("#SifreKayit");
    var ReSifreinput=document.querySelector("#reSifreKayit");
    eventListener();
    
    function eventListener(){
        Kaydetbtn.addEventListener("click",BilgiKaydet);
        LoginBtn.addEventListener("click",LoginWebsite);
    }

    function LoginWebsite(e){
        var KulGirisAdi=UserNameinput.value;
        var KulGirisSifre=Passwordinput.value;
        Ticaret.Login("Kullanicilar", KulGirisAdi,KulGirisSifre,function(res,e){
            if(res.length>0){
                // window.location("/Urunler.html")
               // window.location.replace("/Urunler.html");
                window.location.href="Urunler.html";
            }
            else{
                console.log(res.length)
                alert("Hatalı KullaniciAdi Yada Şifre Yanlıs")
            }
        })
    }

    $('#KullMail').keyup(function(e) {
        if(!$(this).val().match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/))
        {$('#form1 #error').html('<span style="color:#F00;">E-mail Hatalı</span>');}
        else{$('#form1 #error').html('<span style="color:#0C0;">E-mail Doğru</span>');}
    });
    function BilgiKaydet(e){
        var isim=GerAdinput.value;
        var KullaniciAdi=KulAdinput.value;
        var Kullanicimail=Emailinput.value;
        var Kullanicisifre=Sifreinput.value;
        var array=[isim,KullaniciAdi,Kullanicimail,Kullanicisifre];
        var value="Name,UserName,Email,Password";
        var getdata="?,?,?,?";
        if(isim==""||KullaniciAdi==""||Kullanicimail==""||Kullanicisifre==""){ 
            alert("Lütfen Tüm Alanları Doldurunuz");
        }
        else{
        Ticaret.insert('Kullanicilar',value,getdata,array);
        GerAdinput.value="";
        KulAdinput.value="";
        Emailinput.value="";
        Sifreinput.value="";
        ReSifreinput.value="";
        }

    }
