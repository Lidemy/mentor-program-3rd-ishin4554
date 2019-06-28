# 部署
這次 aws 部署基本上完全照著 [部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15) 前輩的文章來執行，非常的淺顯易懂，不過後續在使用 filezilla 連線的時候，有稍微研究一下 aws 的 security group。

## Security Group 
是用來規定哪些來源可以進出，裡面又分成：
- Inbound：這邊是針對網路可以連進來的部分，所以這邊在文章裡面才會要設定 http, https 這樣這兩個網域才能進來。
- Outbound：我們的伺服器可以連出去的部分，通常不限制。
所以在用 sequel pro 的時候記得開通 3306 port，而我是用 SSH 連進去的。

## phpmyadmin bug
過程中 phpmyadmin 出了很煩躁的 `count() bug`，似乎是改版上還未修正的問題，會讓欄位顯示不出來，所以可以參考[這篇文章 debug](https://stackoverflow.com/questions/48001569/phpmyadmin-count-parameter-must-be-an-array-or-an-object-that-implements-co)。

每次改系統相關的檔案都很戰戰競競，很怕一改全部都壞掉QQQQ 再一次感嘆系統工程師的偉大。

## Docker 
挑戰題非常的轟轟烈烈XDDDD 原本想說要直接在 aws 上用 nginx 部署，但稍微看了一下 Docker 的介紹之後，就想說為什麼我不用 docker 開一個環境來試試 nginx，因為在 nginx 就是要測試看看、docker 也是用來模擬環境的，一舉兩得。

**以下操作過程（中間一度改來改去，可能有一些遺漏）：**

安裝 docker，桌面端的話 mac 要安裝 docker，才有 docker engine，伺服器上用這個：
```sh
$ sudo apt-get update
$ sudo apt-get install -y docker.io
$ sudo ln -sf /usr/bin/docker.io /usr/local/bin/docker
$ sudo sed -i '$acomplete -F _docker docker' /etc/bash_completion.d/docker
```

透過Docker 套件庫安裝最新版本
```sh
$ sudo apt-get install apt-transport-https
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 36A1D7869245C8950F966E92D8576A8BA88D21E9
$ sudo bash -c "echo deb https://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"
$ sudo apt-get update
$ sudo apt-get install -y lxc-docker
```

接下來就可以來下載 image 模擬環境了，大抵上 docker 的原理就是我抓各種作業系統的大補帖，一鍵安裝模擬器的感覺，但底層 docker 可以說大革新了虛擬機器的概念，是在作業系統之上的速度更快。

所以我們來搜尋相關的大補帖啊不對是 docker image 
```sh
$ sudo docker search lemp
```

接著下載 image，因為這邊是要執行一個 ubuntu 之上的 nginx + lamp 所以先載 ubuntu，也可以從 docker hub 上挑其他人打包好的 image。
```sh
$ sudo docker pull ubuntu
```

看看現在自己有哪些 image 可以執行，就像是我們的 steam 倉庫一樣 XDD 
```sh
$ sudo docker images
```

跑 image 產生 container（有點像以前安裝 windows 會下載一個有點像光碟檔的東西來安裝）
```sh
$ sudo docker run -it nickistre/ubuntu-lamp /bin/bash
```

接下來就看用 image 開了哪些 container，一個 image 可以產生很多個 container 來做實驗，有點像是 class 跟 instance 的感覺。
```sh
$ docker ps
```

利用 container id 進入 container 
```sh
$ docker exec -it <container name> /bin/bash 
```

會看到一個這樣的路徑，就是進入 container 了：
```sh
root@disojoijfo:/#
```

這樣我們就有了基本的 docker 環境操作，接下來我們要打包 docker 指令變成一個 dockerfile，並製作成一個 image 檔案，以後只要 rum image 檔就可以部署了，於是乎可以想像成，我可以在自己電腦上製作 image 檔，然後上傳伺服器用 docker run image。

先執行 images 檔案，並進行 port 跟 檔案位置的轉換，注意，OSX 有規範哪些可以被分享的範圍，到 preference 去條整新增 /www 位置。
```sh
docker run -tid -p 8080:80 -p 3309:3306 -v /www:/var/www/html --name web ubuntu /bin/bash
```

執行 container
```sh
docker exec -ti web /bin/bash
```

升級 ubuntu 與安裝環境
安裝各種東西在 ubuntu 的模擬環境裡面
```sh
apt install -y nginx php-fpm mysql-client mysql-server vim
```

到 `/etc/php/7.2/fpm/pool.d` 取得網址 listen 監聽的 sock 檔案
到 `/etc/nginx/sites-enabled` default 設定
```sh
location ~ \.php$ {
    include etc/nginx/fastcgi.conf
    fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
}
```

接著執行安裝好的這些應用
```sh
service php7.2-fpm start
service nginx start
service mysql start
```

開啟後設定 mysql 安全性
```sh
mysql_secure_installation
```
到 /etc/mysql/mysql.conf.d/mysqld.cnf 設定登入帳密
開始 sql 指令輸入

```sh
mysql -uroot -p
```
接著輸入 sql 指令
```sh
grant all privileges on *.* to 'root'@'%' identified by ‘<PASSWORD>’;
FLUSH PRIVILEGES;
```
當我們資料庫開好後，可能會想要匯入之前已經開好的資料庫，可以透過這個語法：
```sh
docker exec -i mysql_container mysql -uroot -psecret mysql < db.sql
```

最後是一些 debug 上遇到的部分：
1. 安裝 php-mysql 支援 mysqli 模組
2. 到 php.init 打開 open tags 跟 extension mysqli.so
3. 記得所有東西 設定完都需要 service XXX restart

最後的最後，當 container 確定可以執行之後，可以把這個過程打包成 image 檔案，就是已經設定好的狀態
```sh
docker commit -m="first commit" -a="geakii" web web:v1
docker commit -m="first commit" -a="geakii" web 106078506/lamp
```
你可以在電腦裡 commit，也可以 push 到 docker hub。

## Rewrite
nginx 的 rewrite 規則比較不一樣，他不是透過 .htaccess 檔案，是透過 include .conf 檔案來進行修改，原理是這樣：
```sh
http{
    server {
        location { .. }
    }
}
```

透過監聽不同的網域跟 port 再針對不同的網址進行轉寫。
舉例來說，像是這樣：
```sh
location /forum/login {
    rewrite ^/forum/login$ /forum/login.html break;
}
```
雖然有成功了 html 檔案的，但 php 因為不明原因失敗作罷，直接改了 php 檔案，搞了那～麼的久足足有整整 20 幾個小時吧（？）大概的了解了系統裡面的關係，例如：
1. 一定會有一個連動的資料夾都要去偵測，這個根目錄很重要。
2. 不同系統之間會有 listen 跟開放彼此權限的關係，所以要確保所有資料夾的連動是不是真的有接在一起，可能實際打開才發現裡面什麼都沒有也是有可能的。
3. 然後會有一些初始設定檔可以調整不同的參數，重新再來的話，一開始就了解一下有哪些設定檔跟它的意涵會比較好
4. 跟一定要、一定要打開所有的 error log，可以拯救世界
5. 善用 hello world 小檔案，不要一開始就把專案丟進去QQ 會爆。

最後覺得這次的嘗試是告了一段落，但還有很多可以修正：
1. 透過 docker file 讓 image 透明化
2. 讓 docker 檔案瘦一點，太佔空間了現在，電腦快爆炸了QQ
