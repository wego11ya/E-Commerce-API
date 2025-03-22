// 1. 載入 postman-to-openapi 模組
const postmanToOpenApi = require("postman-to-openapi");

// 2. 定義 Postman collection 的路徑與輸出檔案路徑
const postmanCollection = "./E-Commerce.postman_collection.json";
const outputFile = "./openapi.yaml";

// 3. 使用 async function 執行轉換
async function convertCollection() {
  try {
    // 若提供 outputFile，轉換後會寫入檔案，並同時回傳轉換結果（字串格式）
    const openApiSpec = await postmanToOpenApi(postmanCollection, outputFile, {
      defaultTag: "General",
    });
    console.log("轉換成功！");
    console.log("OpenAPI 規格內容：\n", openApiSpec);
  } catch (error) {
    console.error("轉換失敗：", error);
  }
}

// 呼叫轉換函式
convertCollection();
