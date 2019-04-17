## 交作業流程

1. 先用 `git branch <week>` 開該週的 branch，接著 `git checkout <week>` 進到該 branch 開工，或兩步可以合併成 `git checkout -b <barnchname>`。

2. 在當時 `git clone` 下來的檔案裡寫作業，比較快速的開法可以在 terminal 裡面用 `code <該週資料夾>` 打開該週資料夾在 vscode 裡。

3. 作業一個個完成後就 `git commit` 記得要通過 eslint 的規範。

4. 都完成之後就可以 `git push origin <branch>` 該週的 branch 上去。

5. 發出 pull request，標題隨意，但盡可能標註第幾週、是第一次交作業還是修改了什麼，內文做一些前情提要。 

6. 接著去 [第三期交作業專用的 repo ](https://github.com/Lidemy/homeworks-3rd) 裡到 issues 建立 new issue，標題格式按照 [Week1] 開頭其餘留言內文標題參考 pull request 並留下 request 連結。 bot 之後會 tag 同學來看 code。

7. 當都沒問題之後，老師會同意 merge branch 然後 close issue。

8. 沒有留下任何需要修改的話的話，就 `git pull origin master` 自己 repo 的 master baranch 下來，並 `git branch -d <week>` 即可。

**如果還有要修改一些東西？** 
依舊會 merge 起來，這時候一樣執行第八步，並從第一步重新做起。

**如果原始樣板有調整的狀況？**
1. 開一個新的 branch 命名看得出來是要同步新的模板即可，例如：sync。

2. 去原始模板的網址 `git pull <連結> master` 來抓下該 repo 的 master。 

3. 接著 `git push origin <branch>` 自己的 branch 到自己作業的 repo。

4. 接著發 pull request 並用 @ tag 老師在下方的留言。

5. 當都沒問題之後，老師會同意 merge branch。

6. `git pull origin master` 下來之後，刪除掉新開的 branch 即可。