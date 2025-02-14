export const studyDesigns = [
  {
    id: 1,
    name: "Mô tả",
  },
  {
    id: 2,
    name: "Can thiệp",
  },
  {
    id: 3,
    name: "Mô hình",
  }
]

export const dataCollectingMethods = [
  {
    id: 1,
    name: "Hồi cứu",
  },
  {
    id: 2,
    name: "Tiến cứu",
  },
  {
    id: 3,
    name: "Cắt ngang",
  },
  {
    id: 4,
    name: "Tổng quan y văn",
  },
  {
    id: 5,
    name: "Tham vấn ý kiến chuyên gia",
  }
]

export const sampleSizes = [
  {
    id: 1,
    name: "Toàn bộ",
  },
  {
    id: 2,
    name: "Theo công thức"
  }
]

export const samplingMethods = [
  {
    id: 1,
    name: "Không chọn mẫu",
  },
  {
    id: 2,
    name: "Ngẫu nhiên đơn"
  },
  {
    id: 3,
    name: "Ngẫu nhiên hệ thống"
  },
  {
    id: 4,
    name: "Ngẫu nhiên phân tầng"
  },
  {
    id: 5,
    name: "Ngẫu nhiên thuận tiện"
  }
]

export const costTypes = [
  {
    id: 1,
    name: "Theo năm"
  },
  {
    id: 2,
    name: "Theo khóa"
  },
  {
    id: 3,
    name: "Theo đợt"
  },
  {
    id: 4,
    name: "Theo ca"
  }
]

export const costComponents = [
  {
    id: 1,
    name: "Chi phí trực tiếp y tế"
  },
  {
    id: 2,
    name: "Chi phí trực tiếp ngoài y tế"
  },
  {
    id: 3,
    name: "Chi phí gián tiếp"
  }
]

export const studyPerspectives = [
  {
    id: 1,
    name: "Xã hội"
  },
  {
    id: 2,
    name: "Người chi trả"
  },
  {
    id: 3,
    name: "Người bệnh"
  },
  {
    id: 4,
    name: "Cơ sở y tế"
  },
  {
    id: 5,
    name: "Hệ thống y tế"
  },
  {
    id: 6,
    name: "Cơ quan chi trả Bảo hiểm y tế"
  }
]

export const parameters = [
  {
    id: 1,
    code: "n",
    name: "N"
  },
  {
    id: 2,
    code: "percent",
    name: "%"
  },
  {
    id: 3,
    code: "mean",
    name: "Mean"
  },
  {
    id: 4,
    code: "median",
    name: "Median"
  },
  {
    id: 5,
    code: "sd",
    name: "SD"
  },
  {
    id: 6,
    code: "se",
    name: "SE"
  },
  {
    id: 7,
    code: "min",
    name: "Min"
  },
  {
    id: 8,
    code: "max",
    name: "Max"
  },
  {
    id: 9,
    code: "iqr_25",
    name: "IQR 25%"
  },
  {
    id: 10,
    code: "iqr_75",
    name: "IQR 75%"
  },
  {
    id: 11,
    code: "test",
    name: "Test"
  },
  {
    id: 12,
    code: "mean_diff",
    name: "Mean Difference"
  },
  {
    id: 13,
    code: "lower_95",
    name: "95% CI lower"
  },
  {
    id: 14,
    code: "upper_95",
    name: "95% CI upper"
  },
  {
    id: 15,
    code: "p_value",
    name: "p value"
  },
  {
    id: 16,
    code: "test_value",
    name: "Test value"
  },
  {
    id: 17,
    code: "cost",
    name: "Cost"
  },
  {
    id: 18,
    code: "effectiveness_lyg",
    name: "Eff LYG"
  },
  {
    id: 19,
    code: "effectiveness_qaly",
    name: "Eff QALY"
  },
  {
    id: 20,
    code: "effectiveness_clinical",
    name: "Eff Clinical"
  },
  {
    id: 21,
    code: "icer",
    name: "ICER"
  },
  {
    id: 22,
    code: "icer_result",
    name: "Result"
  },
];

export const outcomes = [
  { id: 1, name: "ICER/LYG" },
  { id: 2, name: "QALY" },
  { id: 3, name: "Tiêu chí lâm sàng" },
];

export const ceStudyDesigns = [
  { id: 1, name: "Alongside clinical trial" },
  { id: 2, name: "Modelling" },
  { id: 3, name: "Kết hợp cả 2 phương pháp" }
];

export const modelTypes = [
  { id: 1, name: "Markov" },
  { id: 2, name: "Cây quyết định" },
  { id: 3, name: "Khác" }
];

export const modelCycleUnits = [
  { id: 1, name: "Tuần" },
  { id: 2, name: "Tháng" },
  { id: 3, name: "Năm" },
];

export const timeHorizonUnits = [
  { id: 1, name: "Tuần" },
  { id: 2, name: "Tháng" },
  { id: 3, name: "Năm" },
  { id: 4, name: "Trọn đời" }
];

export const analysisMethods = [
  { id: 1, name: "CEA" },
  { id: 2, name: "CMA" },
  { id: 3, name: "CUA" },
  { id: 4, name: "CBA" }
];

export const typeOfEffectiveness = [
  { id: 1, name: "LYG" },
  { id: 2, name: "QALY" },
  { id: 3, name: "Tiêu chí lâm sàng" }
];

export const effectivenessDataCollectingMethods = [
  { id: 1, name: "Dựa trên 1 nghiên cứu lâm sàng (trích dẫn nghiên cứu lâm sàng)" },
  { id: 2, name: "Dựa trên tổng quan tài liệu (trích dẫn bài tổng quan)" },
  { id: 3, name: "Dựa trên mức độ ưa chuộng" },
  { id: 4, name: "Tổng quan y văn" },
  { id: 5, name: "Tham vấn ý kiến chuyên gia" }
];

export const costDataCollectingMethods = [
  { id: 1, name: "Tổng quan" },
  { id: 2, name: "Hồi cứu dữ liệu" },
  { id: 3, name: "Phóng vấn ý kiến chuyên gia" },
]

export const currencyUnits = [
  { id: 1, name: "USD" },
  { id: 2, name: "VND" },
  { id: 3, name: "EUR" },
  { id: 4, name: "GBP" },
  { id: 5, name: "Int$" },
];

export const heterogeneityAnalysis = [
  { id: 1, name: "Sự khác biệt của CP do sự khác biệt về đặc điểm bệnh nhân" },
  { id: 2, name: "Sự khác biệt của HQ do sự khác biệt về đặc điểm bệnh nhân" },
  { id: 3, name: "Sự khác biệt của CP-HQ do sự khác biệt về đặc điểm bệnh nhân" },
  { id: 4, name: "Không đề cập" }
];

export const uncertaintyAnalysisResults = [
  { id: 1, name: "Tính bất định của tham số đầu vào lên KQ" },
  { id: 2, name: "Tính bất định của cấu trúc mô hình lên KQ" },
  { id: 3, name: "Tính bất định của các giả định lên KQ" },
]