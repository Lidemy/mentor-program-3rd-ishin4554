## 請以自己的話解釋 API 是什麼
API (application programming interface) 是一種自定義的溝通介面。為什麼會有 API，是因為隨著各式各樣的服務日益成長，像是: Google, Youtube 等等，各家服務會提供一些權限讓其他人可以存取他們的資料，但是總不能直接把門戶大開，讓人直接操作資料庫，所以就定義了一系列方法讓人可以存取服務內容。

第一週有提到應用程式透過作業系統提供的 API 來操作 Kernel，就是一種 API ; 網站我們有時基於 HTTP 來定義一些方式，取得別人服務的內數據跟內容，也是一種 API。在網路上的這種我們叫做 Web API，當然我們也不一定要基於 HTTP 方法，你可以自己去定義你的 API。

用紙條比喻來說，API 已經是更上層的事情，例如：你要怎麼告訴我什麼樣的球、幾個球，比是要球還是是要紙條（應用層）還要之上的事情。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
- **429 Too Many Requests:** 指得是你短時間發出過多的 request，有時候爬蟲會看到這個狀態碼，例如：在爬蟲的時候以不是人類應該有的速度，用太密集的 request 下載網站資料，可能又會出現這個狀態碼。

- **413 Request Entity Too Large:** 使用 POST 發出的東西太大的時候會出現的狀態碼，舉例來說：可能是超過伺服器端在 body 設定的字數限制。

- **206 Partial Content:** 是指小包的下載文件成功的意思，通常是一些支援斷線後保留，有網路時可以繼續下載的服務，這些服務才會有這種拆開來下載的功能，像是以前會用的迅雷。

## API 文件 
**假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。**

### MyRestaurant API

歡迎使用 MyRestaurant API，你可以透過這個 API 得到餐廳資料，或刪除修改餐廳資訊。詳細的使用資訊可以參考下方的 API 文件。

#### GET /restaurants

**Description**
取得餐廳列表

**Authentication**
None

**Resource URL**
`http://myrestaurant.com/api/v1/restaurants`

**Query Parameters**

Name|Required|Type|Description|Default|Example
:---------|:----|:---------|:------|:----|:----
`limit`| option |number| 總共顯示幾筆餐廳，最小值：10，最大值：50。|`20`|`25`

**Response**

Property |Type|Description
:---------|:----|:---------
`id`| number| 這是第幾筆餐廳 
`name`| string| 餐廳名稱

**Example Request**

```shell
curl GET 'http://myrestaurant.com/api/v1/restaurants'
```

**Example Response**

```JSON
[
    {
        'id':1,
        'name':'四君子養生餐飲',
    },
    {
        'id':2,
        'name':'六扇門火鍋'
    },
    {
        'id':3,
        'name':'泰國市場'
    },
    {
        'id':4,
        'name':'甘泉魚麵'
    }
]
```

#### GET /restaurants/\<id>
**Description**
取得單一餐廳

**Authentication**
None

**Resource URL**
`http://myrestaurant.com/api/v1/restaurants/<restaurant id>`

**Query Parameters**

None

**Response**

Property |Type|Description
:---------|:----|:---------|:-----
`id`| number| 這是第幾筆餐廳 
`name`| string| 餐廳名稱

**Example Request**

```shell
curl GET 'http://myrestaurant.com/api/v1/restaurants/<restaurant id>'
```
**Example Request**

```JSON
{
    'id':2,
    'name':'六扇門火鍋'
}
```

#### DELETE /restaurants/\<id>
**Description**
刪除單一餐廳

**Authentication**
需要餐廳登錄者的權限

**Resource URL**
`http://myrestaurant.com/api/v1/restaurants/<restaurant ID>`

**Query Parameters**
None

**Response**
None

**Example Request**
```shell
curl DELETE 'http://myrestaurant.com/api/v1/restaurants/<restaurant ID>'
--header "Authorization: <user token>"
```
**Example Response**
```JSON
204 No Content
```

#### POST /restaurants
**Description**
創建一個餐廳

**Authentication**
需要登入權限

**Resource URL**
`http://myrestaurant.com/api/v1/restaurants/<restaurant ID>`

**Body Parameters**

Name|Required|Type|Description|Default|Example
:---------|:----|:---------|:------|:----|:----
`name`| require |string| 餐廳名稱。最大字數限制：10 個字。| | NaN


**Response**

Property |Type|Description
:---------|:----|:---------
`id`| number| 這是第幾筆
`name`| string| 餐廳名稱

**Example Request**

```shell
curl POST 'http://myrestaurant.com/api/v1/restaurants/<restaurant ID>'
--header "Authorization: <user token>"
--data "{'name':'摩斯漢堡'}"
```

**Example Response**
```JSON
{
    'id':15,
    'name':'梓田野菜屋'
}
```

#### PATCH /restaurants/\<id>
**Description**
修改一個餐廳的資訊

**Authentication**
需要餐廳登錄者權限

**Resource URL**
`http://myrestaurant.com/api/v1/restaurants/<restaurant ID>`

**Body Parameters**

Name|Required|Type|Description|Default|Example
:---------|:----|:---------|:------|:----|:----
`name`| require |string| 餐廳名稱。最大字數限制：10 個字。| | NaN


**Response**

Property |Type|Description
:---------|:----|:---------
`id`| number| 這是第幾筆
`name`| string| 餐廳名稱

**Example Request**

```shell
curl PATCH 'http://myrestaurant.com/api/v1/restaurants/<restaurant ID>'
--header "Authorization: <user token>"
--data "{'name':'摩斯漢堡'}"
```
**Example Response**

```JSON
{
    'id':15,
    'name':'摩斯漢堡'
}
```

