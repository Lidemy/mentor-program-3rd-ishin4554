## 什麼是反向代理（Reverse proxy）？
代理的意思有點像是讓你可以不具名的中間人，在網路的世界通常這個單位就是伺服器，如果你要連到某一個網站要透過某個代理伺服器這叫做正向代理，像是翻牆等等的也是透過代理伺服器來達成。
一開始是為了資安上的考量，這樣可以讓網站方不知道使用者 IP 也能先初步處理跟篩選使用者流量。
而反向代理就是讓使用者不知道網站背後其實真的伺服器是哪一個，例如：不同的 port 口對應不同的功能的情況下，但使用者其實都是透過相同的 port 來進行操作，透果反向代理，我們就可以在一個入口上進行操作，但實質卻是跑不同的服務了。
