import type { QuestionBank } from '../types'

export const banks: Record<string, QuestionBank> = {
  basics: {
    id: 'basics',
    title: '基礎電鍍原理測驗',
    questions: [
      {
        id: 'b1',
        prompt: '電鍍過程中，被鍍工件應接哪一極？',
        choices: ['陽極（正極）', '陰極（負極）', '任意極均可', '交流電路的相位端'],
        answer: 1,
        explanation: '金屬離子在陰極被還原沉積，因此工件需接負極。',
      },
      {
        id: 'b2',
        prompt: '瓦特型鍍鎳配方中，硼酸（H₃BO₃）的主要功能為？',
        choices: ['提供鎳離子', '提升電導度', 'pH 緩衝', '增加光澤度'],
        answer: 2,
        explanation: '硼酸作為弱酸緩衝劑，穩定陰極膜 pH，防止氫氧化鎳沉澱。',
      },
      {
        id: 'b3',
        prompt: '下列何者不屬於電鍍系統的四大元件？',
        choices: ['陽極', '陰極', '電解液', '離心機'],
        answer: 3,
        explanation: '離心機非電鍍槽元件；四大元件為陽極、陰極、電解液、整流器。',
      },
      {
        id: 'b4',
        prompt: '一個電流效率 95% 的鍍鎳槽，若施加 10A 電流 1 小時，實際沉積鎳約多少克？（Ni 電化當量 = 1.095 g/Ah）',
        choices: ['約 5.2 g', '約 10.4 g', '約 11.0 g', '約 20.8 g'],
        answer: 1,
        explanation: '10A × 1h × 1.095 × 0.95 ≈ 10.4 g',
      },
    ],
  },
  process: {
    id: 'process',
    title: '前處理與後處理測驗',
    questions: [
      {
        id: 'p1',
        prompt: '電解除油收尾時應採用何種方式以減少氫脆？',
        choices: ['陰極除油', '陽極除油', '交替除油', '完全停電'],
        answer: 1,
        explanation: '陽極除油產生氧氣不滲入鋼件，可降低氫脆風險。',
      },
      {
        id: 'p2',
        prompt: '水膜測試的合格標準為？',
        choices: [
          '工件上水膜立即破裂',
          '工件上水膜能連續覆蓋 30 秒不斷裂',
          '水滴能形成高接觸角',
          '水面出現彩色干涉',
        ],
        answer: 1,
        explanation: '水膜能均勻連續覆蓋代表表面無油，已完成除油。',
      },
      {
        id: 'p3',
        prompt: '高強度鋼件鍍後烘烤去氫的一般條件為？',
        choices: [
          '60°C 30 分鐘',
          '120°C 1 小時',
          '190–220°C 4–24 小時',
          '400°C 1 小時',
        ],
        answer: 2,
        explanation: '常規去氫條件為 190–220°C 持續 4–24 小時以利氫擴散逸出。',
      },
      {
        id: 'p4',
        prompt: '下列哪種鈍化方式符合 RoHS 規範？',
        choices: ['六價鉻鈍化', '三價鉻鈍化', '鉛鎘混合鈍化', '汞鹽鈍化'],
        answer: 1,
        explanation: '六價鉻已被禁限，現行為三價鉻鈍化。',
      },
    ],
  },
  safety: {
    id: 'safety',
    title: '安全環保證照測驗',
    questions: [
      {
        id: 's1',
        prompt: '氰化物鍍液與酸液必須如何處理？',
        choices: ['同槽操作即可', '物理隔離分區管理', '混合後中和', '倒入同一廢水池'],
        answer: 1,
        explanation: '氰化物遇酸產生 HCN 劇毒氣體，必須物理隔離。',
      },
      {
        id: 's2',
        prompt: '含六價鉻廢水的標準處理順序為？',
        choices: [
          '直接中和沉澱',
          '氧化 → 中和 → 沉澱',
          '還原（六價 → 三價） → 中和 → 沉澱',
          '加氯消毒 → 排放',
        ],
        answer: 2,
        explanation: '六價鉻需先以 SO₂ 或 NaHSO₃ 還原為三價鉻才能沉澱去除。',
      },
      {
        id: 's3',
        prompt: '皮膚接觸強酸後的第一時間處置為？',
        choices: [
          '塗抹中和劑',
          '擦乾後包紮',
          '大量清水沖洗至少 15 分鐘',
          '保持乾燥並休息',
        ],
        answer: 2,
        explanation: '務必以大量清水沖洗稀釋並移除化學品，持續 15 分鐘以上。',
      },
      {
        id: 's4',
        prompt: '霍爾槽（Hull Cell）的主要用途為？',
        choices: [
          '量測鍍液 pH',
          '測試鍍液在寬電流密度範圍下的鍍層外觀',
          '過濾鍍液雜質',
          '自動補充添加劑',
        ],
        answer: 1,
        explanation: '霍爾槽以梯形試片在單一電流下模擬不同電流密度，是鍍液調整的關鍵工具。',
      },
    ],
  },
}

export function findBank(id: string) {
  return banks[id]
}

/** 綜合模擬考：從各題庫隨機抽題 */
export function buildMockExam(count = 10) {
  const all = Object.values(banks).flatMap((b) => b.questions)
  const shuffled = [...all].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
