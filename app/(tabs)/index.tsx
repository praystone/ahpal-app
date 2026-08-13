
import * as Print from 'expo-print';
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

const INVOICE_TEMPLATE = `<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: Helvetica, Arial, sans-serif; padding: 25px; color: #333; }
  h1 { color: #0a7ea4; border-bottom: 2px solid #0a7ea4; padding-bottom: 8px; }
  .invoice-header { display: flex; justify-content: space-between; margin-bottom: 25px; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
  th { background-color: #f1f5f9; color: #0f172a; }
  .total { margin-top: 25px; text-align: right; font-size: 18px; font-weight: bold; color: #0a7ea4; }
  .print-btn { margin-top: 30px; background: #0a7ea4; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; }
</style>
</head>
<body>
  <h1>商業發票 (Invoice)</h1>
  <div class="invoice-header">
    <div>
      <p><strong>發票號碼:</strong> INV-2026-001</p>
      <p><strong>日期:</strong> 2026-08-10</p>
    </div>
    <div>
      <p><strong>客戶:</strong> 數位科技有限公司</p>
      <p><strong>地址:</strong> 台北市信義區信義路五段7號</p>
    </div>
  </div>
  <table>
    <tr><th>項目說明</th><th>數量</th><th>單價</th><th>總計</th></tr>
    <tr><td>行動 App 軟體開發</td><td>1</td><td>$3,500</td><td>$3,500</td></tr>
    <tr><td>HTML 轉 PDF 模組整合</td><td>1</td><td>$1,500</td><td>$1,500</td></tr>
  </table>
  <div class="total">總金額: $5,000 USD</div>
</body>
</html>`;

const RESUME_TEMPLATE = `<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: Helvetica, Arial, sans-serif; padding: 25px; color: #1e293b; line-height: 1.6; }
  h1 { color: #2563eb; margin-bottom: 5px; }
  h2 { color: #334155; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; margin-top: 25px; font-size: 18px; }
  .contact { color: #64748b; font-size: 14px; margin-bottom: 20px; }
  ul { margin-top: 5px; padding-left: 20px; }
  li { margin-bottom: 5px; }
</style>
</head>
<body>
  <h1>王小明 (Alex Wang)</h1>
  <div class="contact">資深軟體工程師 | alex.wang@example.com | +886 912 345 678</div>
  
  <h2>專業技能</h2>
  <p>React Native, TypeScript, Expo, Node.js, Python, PDF 處理與自動化系統開發。</p>

  <h2>工作經歷</h2>
  <p><strong>技術總監 | 創科數位有限公司 (2022 - Present)</strong></p>
  <ul>
    <li>帶領團隊開發跨平台行動應用程式與企業級系統。</li>
    <li>優化效能並導入自動化 PDF 生成與雲端儲存流程。</li>
  </ul>

  <h2>學歷</h2>
  <p><strong>國立台灣大學資訊工程學士 (2014 - 2018)</strong></p>
</body>
</html>`;

const REPORT_TEMPLATE = `<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: Helvetica, Arial, sans-serif; padding: 30px; color: #0f172a; }
  h1 { color: #0a7ea4; text-align: center; margin-bottom: 5px; }
  .subtitle { text-align: center; color: #64748b; font-size: 14px; margin-bottom: 30px; }
  .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
  .card h3 { color: #1e293b; margin-top: 0; }
  .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; }
</style>
</head>
<body>
  <h1>專案執行狀態報告</h1>
  <div class="subtitle">發布日期：2026年8月10日 | 狀態：正常運作</div>
  
  <div class="card">
    <h3>一、 執行摘要</h3>
    <p>本專案順利完成了 HTML 轉 PDF 核心功能的開發與行動端整合，支援完整 CSS 樣式、表格與排版。</p>
  </div>

  <div class="card">
    <h3>二、 關鍵成果</h3>
    <p>成功支援在行動裝置上一鍵生成高品質 PDF 並進行系統分享與儲存。</p>
  </div>

  <div class="footer">
    <p>© 2026 HTML to PDF Converter App. All rights reserved.</p>
  </div>
</body>
</html>`;

export default function HomeScreen() {
  const [htmlContent, setHtmlContent] = useState(INVOICE_TEMPLATE);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"invoice" | "resume" | "report" | "custom">("invoice");

  const loadTemplate = (type: "invoice" | "resume" | "report" | "custom", content: string) => {
    setActiveTab(type);
    setHtmlContent(content);
  };

const handleGeneratePDF = async () => {
  try {
    setLoading(true);

    // 使用 expo-print 直接生成 PDF
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      width: 612,   // A4 寬度（像素）
      height: 792,  // A4 高度（像素）
    });

    console.log('PDF 儲存路徑：', uri);
    setLoading(false);

    // 分享 PDF
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: '分享 PDF 檔案',
        UTI: 'public.pdf',
      });
    } else {
      Alert.alert('成功', `PDF 已儲存至：\n${uri}`);
    }
  } catch (error: any) {
    setLoading(false);
    Alert.alert('錯誤', `PDF 生成失敗：${error?.message || error}`);
  }
};

  return (
    <ScreenContainer className="p-4 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mb-6 pt-2">
          <Text className="text-3xl font-bold text-foreground">HTML 轉 PDF 轉換器</Text>
          <Text className="text-sm text-muted text-center mt-1">
            頂級穩定版（FileSystem 暫存與原生分享）
          </Text>
        </View>

        {/* Template Selector */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-foreground mb-2">選擇預設範本：</Text>
          <View className="flex-row flex-wrap gap-2">
            <TouchableOpacity
              onPress={() => loadTemplate("invoice", INVOICE_TEMPLATE)}
              style={[
                { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
                activeTab === "invoice" ? { backgroundColor: "#0a7ea4", borderColor: "#0a7ea4" } : { backgroundColor: "#f1f5f9", borderColor: "#cbd5e1" }
              ]}
            >
              <Text style={{ color: activeTab === "invoice" ? "#ffffff" : "#334155", fontWeight: "600", fontSize: 13 }}>
                商業發票
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => loadTemplate("resume", RESUME_TEMPLATE)}
              style={[
                { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
                activeTab === "resume" ? { backgroundColor: "#0a7ea4", borderColor: "#0a7ea4" } : { backgroundColor: "#f1f5f9", borderColor: "#cbd5e1" }
              ]}
            >
              <Text style={{ color: activeTab === "resume" ? "#ffffff" : "#334155", fontWeight: "600", fontSize: 13 }}>
                個人履歷
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => loadTemplate("report", REPORT_TEMPLATE)}
              style={[
                { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
                activeTab === "report" ? { backgroundColor: "#0a7ea4", borderColor: "#0a7ea4" } : { backgroundColor: "#f1f5f9", borderColor: "#cbd5e1" }
              ]}
            >
              <Text style={{ color: activeTab === "report" ? "#ffffff" : "#334155", fontWeight: "600", fontSize: 13 }}>
                專案報告
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => loadTemplate("custom", "<html>\n<head>\n<meta charset=\"utf-8\">\n<style>\n  body { font-family: sans-serif; padding: 20px; }\n  h1 { color: #2563eb; }\n</style>\n</head>\n<body>\n  <h1>自訂標題</h1>\n  <p>在這裡輸入您的自訂 HTML 內容...</p>\n</body>\n</html>")}
              style={[
                { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
                activeTab === "custom" ? { backgroundColor: "#0a7ea4", borderColor: "#0a7ea4" } : { backgroundColor: "#f1f5f9", borderColor: "#cbd5e1" }
              ]}
            >
              <Text style={{ color: activeTab === "custom" ? "#ffffff" : "#334155", fontWeight: "600", fontSize: 13 }}>
                自訂空白
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HTML Editor */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-2">HTML 原始碼編輯器：</Text>
          <TextInput
            value={htmlContent}
            onChangeText={(text) => {
              setHtmlContent(text);
              setActiveTab("custom");
            }}
            multiline
            numberOfLines={12}
            textAlignVertical="top"
            placeholder="請在此輸入或貼上 HTML 程式碼..."
            placeholderTextColor="#94a3b8"
            style={{
              backgroundColor: "#1e293b",
              color: "#f8fafc",
              padding: 12,
              borderRadius: 8,
              fontSize: 13,
              fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
              minHeight: 220,
              borderWidth: 1,
              borderColor: "#334155",
            }}
          />
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          onPress={handleGeneratePDF}
          disabled={loading}
          style={{
            backgroundColor: "#0a7ea4",
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            shadowColor: "#0a7ea4",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 4,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <>
              <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold", marginRight: 8 }}>
                產生並匯出文件 (FileSystem + Sharing)
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}
