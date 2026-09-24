// ==UserScript==
// @name         Privacy Mosaic
// @namespace    https://greasyfork.org/en/users/1575945-star-tanuki07
// @homepageURL  https://github.com/Startanuki07
// @license      MIT
// @author       Star_tanuki07
// @version      1.0.0.0
// @description  Universal privacy mosaic – blur or redact handles, IDs, and avatars on any site
// @description:en-US  Universal privacy mosaic – blur or redact handles, IDs, and avatars on any site
// @description:zh-TW  通用隱私馬賽克工具──在任何網站模糊或遮蔽使用者名稱、ID 與頭像
// @description:zh-CN  通用隐私马赛克工具──在任何网站模糊或遮蔽用户名、ID 和头像
// @description:ja  万能プライバシーモザイク──あらゆるサイトでユーザー名、ID、アバターをぼかすか隠します
// @description:ko  범용 개인정보 모자이크 – 모든 사이트에서 사용자 이름, ID 및 아바타를 흐리게 처리하거나 가립니다
// @description:es  Mosaico de privacidad universal – desenfoca u oculta nombres de usuario, ID y avatares en cualquier sitio
// @description:pt-BR  Mosaico de privacidade universal – desfoca ou oculta nomes de usuário, IDs e avatares em qualquer site
// @description:fr  Masque de confidentialité universel – floute ou masque les identifiants, IDs et avatars sur n’importe quel site
// @description:ru  Универсальная маскировка конфиденциальности — размывает или скрывает имена пользователей, ID и аватары на любом сайте
// @description:de  Universeller Datenschutz-Mosaikfilter – verwischt oder verbirgt Benutzernamen, IDs und Avatare auf jeder Website
// @description:it  Mosaico universale per la privacy – sfoca o nasconde nomi utente, ID e avatar su qualsiasi sito
// @description:tr  Evrensel gizlilik mozaiği – herhangi bir sitede kullanıcı adlarını, kimlikleri ve avatarları bulanıklaştırır veya gizler
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @match        *://*/*
// @noframes
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';

  const I18N = {
    en: {
      title:'Privacy Mosaic',enable:'Enable masking',
      desc_enable:'Blur or redact usernames, avatars and IDs on the current page.',
      style_lbl:'Style',blur:'Blur',redact:'Redact',
      intensity:'Intensity',icon_size:'Icon size',options:'Options',
      persistent:'Persistent ON',desc_persistent:'Masking starts automatically on every new page load.',
      
      fab_allowlist:'Show button on this site',desc_fab_allowlist:'The button is hidden by default. Turn this on to keep it visible every time you load this site.',default_rules:'Enable default rules',desc_default_rules:n=>`The ${n} built-in selectors (avatars, usernames, IDs) that work across most sites. Turn off to stop applying them everywhere — your custom rules keep working as usual.`,highlight_default:'Highlight default-rule matches',desc_highlight_default:'Outlines elements caught by the built-in rules in amber, so you can tell them apart from your custom rules at a glance.',
      def_list_toggle:n=>`View the ${n} built-in selectors`,def_list_avatar:'Avatars',def_list_handle:'Usernames',def_list_id:'IDs',def_list_count:n=>`${n} selectors`,
      def_sel_disable:'Disable this selector',def_sel_restore:'Restore this selector',def_list_disabled_count:n=>`${n} disabled`,def_reset_all:'Reset all disabled selectors',def_group_disable:'Disable all selectors in this group',def_group_enable:'Enable all selectors in this group',def_group_disable_all:'Disable all built-in selectors',def_group_enable_all:'Enable all built-in selectors',defbar_on:n=>`Built-in rules active · ${n} matched`,defbar_idle:'Built-in rules active · no matches on this page',defbar_off:'Built-in rules are off',defbar_none:'All built-in selectors are disabled',defbar_tip:'Your custom rules work on top of the built-in ones — they never replace or conflict with each other.',defbar_manage:'Manage',defbar_hl_tip:'Outline built-in matches in amber',no_rules_hint:n=>`The ${n} built-in rules already cover most sites — you may not need to add any.`,
      fab_allowlist_mgr:'Sites with the button shown',fab_allowlist_ph:'One domain per line, e.g.\nexample.com\nanother-site.org',
      theme_dark:'Dark',theme_light:'Light',language:'Language',
      masked:n=>`${n} element${n!==1?'s':''} masked`,hint:'Alt + Click to exempt an element',
      close:'Close',menu_toggle:'Privacy Mosaic — Toggle Masking (also sets Persistent)',menu_panel:'Privacy Mosaic — Open Panel',
      menu_lang:'Privacy Mosaic — Switch Language',
      reload_hint:'Language changed — reload the page for it to fully apply.',
      menu_show_fab:'Privacy Mosaic — Show Button (this visit only)',menu_hide_fab:'Privacy Mosaic — Hide Button (this visit only)',menu_fabsite_add:'Privacy Mosaic — Always Show Button on This Site',menu_fabsite_remove:'Privacy Mosaic — Stop Always Showing Button on This Site',
      custom_rules:'Custom Rules',add_rule:'+ Add Rule',rule_manager:'Rule Manager',rm_all_sites:'All sites',
      detecting:'Detection Mode — click an element. ESC to cancel.',
      cancel_detect:'Cancel',rule_name_lbl:'Rule name',
      rule_name_ph:'e.g. Avatar, Username…',save_rule:'Save',
      no_rules:'No custom rules yet.',rule_edit:'Re-detect',rule_delete:'Delete',
      rule_edit_elsewhere:site=>`Visit ${site} to edit this rule`,rule_offsite:'Off-site',
      confirm_delete:'Delete this rule?',
      tab_masking:'Masking',tab_rules:'Rules',css_selector:'CSS Selector',site_lbl:'Site',
      redact_variant:'Redact style',rv_solid:'Solid',rv_mosaic:'Mosaic',rv_checker:'Checker',rv_noise:'Noise',
      ob_step:n=>`Step ${n} of 3`,
      ob_welcome_title:'Welcome to Privacy Mosaic',ob_welcome_body:'This blurs or redacts usernames, avatars and IDs on the page automatically.',
      ob_rules_title:'Most sites need custom rules',ob_rules_body:'A few sites are recognized automatically, but most pages need you to add your own rule for what to hide.',
      ob_next_title:'Get started',ob_next_body:'Open the Rules tab above and add your first rule to start masking this site.',
      ob_next:'Next',ob_skip:'Skip',ob_gotit:'Got it',
    },
    'zh-TW':{
      title:'Privacy Mosaic',enable:'啟用遮罩',
      desc_enable:'對目前頁面的用戶名、頭像與 ID 套用模糊或塗黑。',
      style_lbl:'遮罩風格',blur:'模糊',redact:'塗黑',
      intensity:'強度',icon_size:'圖示大小',options:'選項',
      persistent:'恆定開啟',desc_persistent:'每次載入新頁面時自動啟動遮罩。',
      
      fab_allowlist:'在此網站顯示按鈕',desc_fab_allowlist:'按鈕預設為隱藏。開啟後，每次載入此網站都會自動顯示按鈕。',default_rules:'啟用預設規則',desc_default_rules:n=>`內建適用於大部分網站的 ${n} 條選擇器（頭像、使用者名、ID）。關閉後全站停用，但不影響您的自訂規則。`,highlight_default:'標示預設規則命中',desc_highlight_default:'將內建規則抓到的元素用琥珀色外框標示出來，方便與自訂規則的遮罩區分。',
      def_list_toggle:n=>`查看內建的 ${n} 條選擇器`,def_list_avatar:'頭像',def_list_handle:'使用者名',def_list_id:'ID',def_list_count:n=>`共 ${n} 條`,
      def_sel_disable:'停用此選擇器',def_sel_restore:'恢復此選擇器',def_list_disabled_count:n=>`已停用 ${n} 條`,def_reset_all:'重置全部停用的選擇器',def_group_disable:'停用此群組全部選擇器',def_group_enable:'啟用此群組全部選擇器',def_group_disable_all:'停用全部內建選擇器',def_group_enable_all:'啟用全部內建選擇器',defbar_on:n=>`內建規則運作中 · 本頁命中 ${n} 個元素`,defbar_idle:'內建規則運作中 · 本頁尚無命中',defbar_off:'內建規則已關閉',defbar_none:'內建選擇器已全數停用',defbar_tip:'你的自訂規則是疊加在內建規則之上，彼此獨立、不會互相覆蓋或干擾。',defbar_manage:'管理',defbar_hl_tip:'以琥珀色框出內建規則命中的元素',no_rules_hint:n=>`內建的 ${n} 條規則已涵蓋多數網站，不一定需要自己新增。`,
      fab_allowlist_mgr:'已加入名單的網站',fab_allowlist_ph:'每行一個網域，例如\nexample.com\nanother-site.org',
      theme_dark:'深色',theme_light:'淺色',language:'語言',
      masked:n=>`已遮罩 ${n} 個元素`,hint:'Alt + 點擊 可豁免單一元素',
      close:'關閉',menu_toggle:'Privacy Mosaic — 切換遮罩（同時設為恆定開啟）',menu_panel:'Privacy Mosaic — 開啟設定面板',
      menu_lang:'Privacy Mosaic — 切換語言',
      reload_hint:'已切換語言，請重新整理頁面以完全套用。',
      menu_show_fab:'Privacy Mosaic — 暫時顯示按鈕（僅本次瀏覽）',menu_hide_fab:'Privacy Mosaic — 暫時隱藏按鈕（僅本次瀏覽）',menu_fabsite_add:'Privacy Mosaic — 在此網站永遠顯示按鈕',menu_fabsite_remove:'Privacy Mosaic — 取消在此網站永遠顯示按鈕',
      custom_rules:'自訂規則',add_rule:'+ 新增規則',rule_manager:'規則管理',rm_all_sites:'所有網站',
      detecting:'偵測模式 — 點擊要遮罩的元素。按 ESC 取消。',
      cancel_detect:'取消',rule_name_lbl:'規則名稱',
      rule_name_ph:'例如：頭像、用戶名稱…',save_rule:'儲存',
      no_rules:'尚無自訂規則。',rule_edit:'重新偵測',rule_delete:'刪除',
      rule_edit_elsewhere:site=>`請前往 ${site} 編輯此規則`,rule_offsite:'非本站',
      confirm_delete:'確定刪除此規則？',
      tab_masking:'遮罩設定',tab_rules:'規則',css_selector:'CSS 選擇器',site_lbl:'網站',
      redact_variant:'塗黑樣式',rv_solid:'純色',rv_mosaic:'馬賽克',rv_checker:'棋盤格',rv_noise:'噪點',
      ob_step:n=>`第 ${n} 步，共 3 步`,
      ob_welcome_title:'歡迎使用 Privacy Mosaic',ob_welcome_body:'這個腳本會自動模糊或塗黑頁面上的用戶名、頭像與 ID。',
      ob_rules_title:'大部分網站需要自訂規則',ob_rules_body:'少數網站有內建自動辨識，但大部分頁面需要您自行新增規則來指定要隱藏的內容。',
      ob_next_title:'開始使用',ob_next_body:'點開上方的規則分頁，新增第一條規則來遮罩這個網站。',
      ob_next:'下一步',ob_skip:'跳過',ob_gotit:'知道了',
    },
    'zh-CN':{
      title:'Privacy Mosaic',enable:'启用遮罩',
      desc_enable:'对当前页面的用户名、头像与 ID 应用模糊或涂黑。',
      style_lbl:'遮罩风格',blur:'模糊',redact:'涂黑',
      intensity:'强度',icon_size:'图标大小',options:'选项',
      persistent:'常驻开启',desc_persistent:'每次加载新页面时自动启动遮罩。',
      
      fab_allowlist:'在此网站显示按钮',desc_fab_allowlist:'按钮默认隐藏。开启后，每次加载此网站都会自动显示按钮。',default_rules:'启用默认规则',desc_default_rules:n=>`内置适用于大部分网站的 ${n} 条选择器（头像、用户名、ID）。关闭后全站停用，但不影响您的自定义规则。`,highlight_default:'标示默认规则命中',desc_highlight_default:'将内置规则匹配到的元素用琥珀色外框标示出来，方便与自定义规则的遮罩区分。',
      def_list_toggle:n=>`查看内置的 ${n} 条选择器`,def_list_avatar:'头像',def_list_handle:'用户名',def_list_id:'ID',def_list_count:n=>`共 ${n} 条`,
      def_sel_disable:'停用此选择器',def_sel_restore:'恢复此选择器',def_list_disabled_count:n=>`已停用 ${n} 条`,def_reset_all:'重置全部已停用的选择器',def_group_disable:'停用此分组全部选择器',def_group_enable:'启用此分组全部选择器',def_group_disable_all:'停用全部内置选择器',def_group_enable_all:'启用全部内置选择器',defbar_on:n=>`内置规则运行中 · 本页命中 ${n} 个元素`,defbar_idle:'内置规则运行中 · 本页暂无命中',defbar_off:'内置规则已关闭',defbar_none:'内置选择器已全部停用',defbar_tip:'你的自定义规则是叠加在内置规则之上，彼此独立、不会互相覆盖或干扰。',defbar_manage:'管理',defbar_hl_tip:'以琥珀色框出内置规则命中的元素',no_rules_hint:n=>`内置的 ${n} 条规则已覆盖大多数网站，不一定需要自己添加。`,
      fab_allowlist_mgr:'已加入名单的网站',fab_allowlist_ph:'每行一个域名，例如\nexample.com\nanother-site.org',
      theme_dark:'深色',theme_light:'浅色',language:'语言',
      masked:n=>`已遮罩 ${n} 个元素`,hint:'Alt + 点击 可豁免单一元素',
      close:'关闭',menu_toggle:'Privacy Mosaic — 切换遮罩（同时设为常驻开启）',menu_panel:'Privacy Mosaic — 打开设置面板',
      menu_lang:'Privacy Mosaic — 切换语言',
      reload_hint:'已切换语言，请刷新页面以完全应用。',
      menu_show_fab:'Privacy Mosaic — 临时显示按钮（仅本次访问）',menu_hide_fab:'Privacy Mosaic — 临时隐藏按钮（仅本次访问）',menu_fabsite_add:'Privacy Mosaic — 在此网站始终显示按钮',menu_fabsite_remove:'Privacy Mosaic — 取消在此网站始终显示按钮',
      custom_rules:'自定义规则',add_rule:'+ 新增规则',rule_manager:'规则管理',rm_all_sites:'所有网站',
      detecting:'检测模式 — 点击要遮罩的元素。按 ESC 取消。',
      cancel_detect:'取消',rule_name_lbl:'规则名称',
      rule_name_ph:'例如：头像、用户名称…',save_rule:'保存',
      no_rules:'暂无自定义规则。',rule_edit:'重新检测',rule_delete:'删除',
      rule_edit_elsewhere:site=>`请前往 ${site} 编辑此规则`,rule_offsite:'非本站',
      confirm_delete:'确定删除此规则？',
      tab_masking:'遮罩设置',tab_rules:'规则',css_selector:'CSS 选择器',site_lbl:'网站',
      redact_variant:'涂黑样式',rv_solid:'纯色',rv_mosaic:'马赛克',rv_checker:'棋盘格',rv_noise:'噪点',
      ob_step:n=>`第 ${n} 步，共 3 步`,
      ob_welcome_title:'欢迎使用 Privacy Mosaic',ob_welcome_body:'这个脚本会自动模糊或涂黑页面上的用户名、头像与 ID。',
      ob_rules_title:'大部分网站需要自定义规则',ob_rules_body:'少数网站有内置自动识别，但大部分页面需要您自行添加规则来指定要隐藏的内容。',
      ob_next_title:'开始使用',ob_next_body:'点开上方的规则标签页，添加第一条规则来遮罩这个网站。',
      ob_next:'下一步',ob_skip:'跳过',ob_gotit:'知道了',
    },
    ja:{
      title:'Privacy Mosaic',enable:'マスクを有効化',
      desc_enable:'現在のページのユーザー名・アバター・IDをぼかし・塗りつぶしします。',
      style_lbl:'スタイル',blur:'ぼかし',redact:'塗りつぶし',
      intensity:'強度',icon_size:'アイコンサイズ',options:'オプション',
      persistent:'常時オン',desc_persistent:'新しいページを読み込むたびに自動的にマスクを開始します。',
      
      fab_allowlist:'このサイトでボタンを表示',desc_fab_allowlist:'ボタンは初期状態では非表示です。オンにすると、このサイトを読み込むたびに自動的に表示されます。',default_rules:'デフォルトルールを有効化',desc_default_rules:n=>`ほとんどのサイトに対応する組み込みの${n}個のセレクター（アバター、ユーザー名、ID）。オフにするとサイト全体で無効になりますが、カスタムルールには影響しません。`,highlight_default:'デフォルトルールの一致を強調表示',desc_highlight_default:'組み込みルールで検出された要素をアンバー色の枠線で表示し、カスタムルールと見分けやすくします。',
      def_list_toggle:n=>`組み込みの${n}個のセレクターを見る`,def_list_avatar:'アバター',def_list_handle:'ユーザー名',def_list_id:'ID',def_list_count:n=>`${n}個`,
      def_sel_disable:'このセレクターを無効化',def_sel_restore:'このセレクターを復元',def_list_disabled_count:n=>`${n}個無効`,def_reset_all:'無効化したセレクターをすべてリセット',def_group_disable:'このグループのセレクターをすべて無効化',def_group_enable:'このグループのセレクターをすべて有効化',def_group_disable_all:'組み込みセレクターをすべて無効化',def_group_enable_all:'組み込みセレクターをすべて有効化',defbar_on:n=>`組み込みルール稼働中 · このページで ${n} 件一致`,defbar_idle:'組み込みルール稼働中 · このページでは一致なし',defbar_off:'組み込みルールはオフです',defbar_none:'組み込みセレクターはすべて無効です',defbar_tip:'カスタムルールは組み込みルールに上乗せされます。互いに置き換えたり干渉したりしません。',defbar_manage:'管理',defbar_hl_tip:'組み込みルールの一致要素を琥珀色で囲む',no_rules_hint:n=>`組み込みの${n}個のルールでほとんどのサイトをカバーしています。追加不要な場合もあります。`,
      fab_allowlist_mgr:'ボタンを表示するサイト',fab_allowlist_ph:'1行に1ドメイン、例：\nexample.com\nanother-site.org',
      theme_dark:'ダーク',theme_light:'ライト',language:'言語',
      masked:n=>`${n} 件マスク済み`,hint:'Alt + クリック で除外',
      close:'閉じる',menu_toggle:'Privacy Mosaic — マスク切替（常時オンも同期）',menu_panel:'Privacy Mosaic — パネルを開く',
      menu_lang:'Privacy Mosaic — 言語を切り替え',
      reload_hint:'言語を切り替えました。完全に反映するにはページを再読み込みしてください。',
      menu_show_fab:'Privacy Mosaic — アイコンを一時的に表示（今回のみ）',menu_hide_fab:'Privacy Mosaic — アイコンを一時的に非表示（今回のみ）',menu_fabsite_add:'Privacy Mosaic — このサイトで常にボタンを表示',menu_fabsite_remove:'Privacy Mosaic — このサイトでの常時表示を解除',
      custom_rules:'カスタムルール',add_rule:'+ ルールを追加',rule_manager:'ルール管理',rm_all_sites:'すべてのサイト',
      detecting:'検出モード — 要素をクリック。ESCでキャンセル。',
      cancel_detect:'キャンセル',rule_name_lbl:'ルール名',
      rule_name_ph:'例：アバター、ユーザー名…',save_rule:'保存',
      no_rules:'カスタムルールはまだありません。',rule_edit:'再検出',rule_delete:'削除',
      rule_edit_elsewhere:site=>`${site} にアクセスして編集してください`,rule_offsite:'他サイト',
      confirm_delete:'このルールを削除しますか？',
      tab_masking:'マスク設定',tab_rules:'ルール',css_selector:'CSS セレクター',site_lbl:'サイト',
      redact_variant:'塗りつぶしスタイル',rv_solid:'単色',rv_mosaic:'モザイク',rv_checker:'チェッカー',rv_noise:'ノイズ',
      ob_step:n=>`ステップ ${n}/3`,
      ob_welcome_title:'Privacy Mosaicへようこそ',ob_welcome_body:'ページ上のユーザー名・アバター・IDを自動的にぼかしまたは塗りつぶします。',
      ob_rules_title:'ほとんどのサイトにはカスタムルールが必要です',ob_rules_body:'一部のサイトは自動認識されますが、多くのページでは非表示にする内容を指定するルールを追加する必要があります。',
      ob_next_title:'始めましょう',ob_next_body:'上部の「ルール」タブを開き、最初のルールを追加してこのサイトのマスキングを開始してください。',
      ob_next:'次へ',ob_skip:'スキップ',ob_gotit:'了解',
    },
    ko:{
      title:'Privacy Mosaic',enable:'마스크 활성화',
      desc_enable:'현재 페이지의 사용자명, 아바타, ID를 흐리기 또는 가리기합니다.',
      style_lbl:'스타일',blur:'블러',redact:'가리기',
      intensity:'강도',icon_size:'아이콘 크기',options:'옵션',
      persistent:'항상 켜기',desc_persistent:'새 페이지를 불러올 때마다 자동으로 마스크를 시작합니다.',
      
      fab_allowlist:'이 사이트에서 버튼 표시',desc_fab_allowlist:'버튼은 기본적으로 숨겨져 있습니다. 켜면 이 사이트를 불러올 때마다 자동으로 표시됩니다.',default_rules:'기본 규칙 사용',desc_default_rules:n=>`대부분의 사이트에 적용되는 내장 ${n}개 선택자(아바타, 사용자 이름, ID)입니다. 끄면 전체 사이트에서 비활성화되며, 사용자 지정 규칙에는 영향을 주지 않습니다.`,highlight_default:'기본 규칙 일치 항목 강조 표시',desc_highlight_default:'기본 규칙에 감지된 요소를 호박색 테두리로 표시하여 사용자 지정 규칙과 한눈에 구분할 수 있습니다.',
      def_list_toggle:n=>`내장 선택자 ${n}개 보기`,def_list_avatar:'아바타',def_list_handle:'사용자 이름',def_list_id:'ID',def_list_count:n=>`${n}개`,
      def_sel_disable:'이 선택자 비활성화',def_sel_restore:'이 선택자 복원',def_list_disabled_count:n=>`${n}개 비활성화됨`,def_reset_all:'비활성화된 선택자 모두 초기화',def_group_disable:'이 그룹의 선택자 모두 비활성화',def_group_enable:'이 그룹의 선택자 모두 활성화',def_group_disable_all:'내장 선택자 모두 비활성화',def_group_enable_all:'내장 선택자 모두 활성화',defbar_on:n=>`내장 규칙 작동 중 · 이 페이지에서 ${n}개 일치`,defbar_idle:'내장 규칙 작동 중 · 이 페이지에 일치 없음',defbar_off:'내장 규칙이 꺼져 있습니다',defbar_none:'내장 선택자가 모두 비활성화되었습니다',defbar_tip:'커스텀 규칙은 내장 규칙 위에 추가로 적용되며 서로 대체하거나 충돌하지 않습니다.',defbar_manage:'관리',defbar_hl_tip:'내장 규칙에 일치한 요소를 호박색으로 표시',no_rules_hint:n=>`내장 규칙 ${n}개가 대부분의 사이트를 이미 다룹니다. 직접 추가하지 않아도 될 수 있습니다.`,
      fab_allowlist_mgr:'버튼이 표시되는 사이트',fab_allowlist_ph:'한 줄에 하나의 도메인, 예:\nexample.com\nanother-site.org',
      theme_dark:'다크',theme_light:'라이트',language:'언어',
      masked:n=>`${n}개 마스크됨`,hint:'Alt + 클릭으로 제외',
      close:'닫기',menu_toggle:'Privacy Mosaic — 마스크 토글 (항상 켜기도 함께 설정)',menu_panel:'Privacy Mosaic — 패널 열기',
      menu_lang:'Privacy Mosaic — 언어 전환',
      reload_hint:'언어가 변경되었습니다. 완전히 적용하려면 페이지를 새로고침하세요.',
      menu_show_fab:'Privacy Mosaic — 버튼 임시 표시（이번 방문에만）',menu_hide_fab:'Privacy Mosaic — 버튼 임시 숨기기（이번 방문에만）',menu_fabsite_add:'Privacy Mosaic — 이 사이트에서 항상 버튼 표시',menu_fabsite_remove:'Privacy Mosaic — 이 사이트 항상 표시 해제',
      custom_rules:'커스텀 규칙',add_rule:'+ 규칙 추가',rule_manager:'규칙 관리',rm_all_sites:'모든 사이트',
      detecting:'감지 모드 — 요소를 클릭하세요. ESC로 취소.',
      cancel_detect:'취소',rule_name_lbl:'규칙 이름',
      rule_name_ph:'예: 아바타, 사용자명…',save_rule:'저장',
      no_rules:'커스텀 규칙이 없습니다.',rule_edit:'재감지',rule_delete:'삭제',
      rule_edit_elsewhere:site=>`${site}에서 편집하세요`,rule_offsite:'타 사이트',
      confirm_delete:'이 규칙을 삭제하시겠습니까？',
      tab_masking:'마스크',tab_rules:'규칙',css_selector:'CSS 선택자',site_lbl:'사이트',
      redact_variant:'가리기 스타일',rv_solid:'단색',rv_mosaic:'모자이크',rv_checker:'체커',rv_noise:'노이즈',
      ob_step:n=>`${n}/3단계`,
      ob_welcome_title:'Privacy Mosaic에 오신 것을 환영합니다',ob_welcome_body:'페이지의 사용자명, 아바타, ID를 자동으로 흐리게 하거나 가립니다.',
      ob_rules_title:'대부분의 사이트에는 사용자 지정 규칙이 필요합니다',ob_rules_body:'일부 사이트는 자동으로 인식되지만, 대부분의 페이지에서는 숨길 항목을 지정하는 규칙을 직접 추가해야 합니다.',
      ob_next_title:'시작하기',ob_next_body:'위의 규칙 탭을 열고 첫 번째 규칙을 추가하여 이 사이트의 마스킹을 시작하세요.',
      ob_next:'다음',ob_skip:'건너뛰기',ob_gotit:'확인',
    },
    es:{
      title:'Privacy Mosaic',enable:'Activar máscara',
      desc_enable:'Difumina o tacha nombres de usuario, avatares e IDs en la página actual.',
      style_lbl:'Estilo',blur:'Difuminar',redact:'Tachar',
      intensity:'Intensidad',icon_size:'Tamaño del icono',options:'Opciones',
      persistent:'Siempre activo',desc_persistent:'El enmascaramiento se inicia automáticamente en cada nueva página.',
      
      fab_allowlist:'Mostrar botón en este sitio',desc_fab_allowlist:'El botón está oculto por defecto. Actívalo para que se muestre automáticamente cada vez que cargues este sitio.',default_rules:'Activar reglas predeterminadas',desc_default_rules:n=>`Los ${n} selectores integrados (avatares, nombres de usuario, IDs) que funcionan en la mayoría de los sitios. Desactívalo para dejar de aplicarlos en todas partes; tus reglas personalizadas seguirán funcionando con normalidad.`,highlight_default:'Resaltar coincidencias de reglas predeterminadas',desc_highlight_default:'Resalta con un borde ámbar los elementos detectados por las reglas integradas, para distinguirlos de tus reglas personalizadas de un vistazo.',
      def_list_toggle:n=>`Ver los ${n} selectores integrados`,def_list_avatar:'Avatares',def_list_handle:'Nombres de usuario',def_list_id:'IDs',def_list_count:n=>`${n} selectores`,
      def_sel_disable:'Desactivar este selector',def_sel_restore:'Restaurar este selector',def_list_disabled_count:n=>`${n} desactivados`,def_reset_all:'Restablecer todos los selectores desactivados',def_group_disable:'Desactivar todos los selectores de este grupo',def_group_enable:'Activar todos los selectores de este grupo',def_group_disable_all:'Desactivar todos los selectores integrados',def_group_enable_all:'Activar todos los selectores integrados',defbar_on:n=>`Reglas integradas activas · ${n} coincidencias`,defbar_idle:'Reglas integradas activas · sin coincidencias en esta página',defbar_off:'Las reglas integradas están desactivadas',defbar_none:'Todos los selectores integrados están desactivados',defbar_tip:'Tus reglas personalizadas se suman a las integradas: nunca las reemplazan ni entran en conflicto.',defbar_manage:'Gestionar',defbar_hl_tip:'Resaltar en ámbar las coincidencias integradas',no_rules_hint:n=>`Las ${n} reglas integradas ya cubren la mayoría de los sitios; quizá no necesites añadir ninguna.`,
      fab_allowlist_mgr:'Sitios con el botón visible',fab_allowlist_ph:'Un dominio por línea, ej.\nexample.com\nanother-site.org',
      theme_dark:'Oscuro',theme_light:'Claro',language:'Idioma',
      masked:n=>`${n} elemento${n!==1?'s':''} ocultado${n!==1?'s':''}`,hint:'Alt + Clic para excluir',
      close:'Cerrar',menu_toggle:'Privacy Mosaic — Alternar máscara (también activa Siempre activo)',menu_panel:'Privacy Mosaic — Abrir panel',
      menu_lang:'Privacy Mosaic — Cambiar idioma',
      reload_hint:'Idioma cambiado. Recarga la página para aplicarlo por completo.',
      menu_show_fab:'Privacy Mosaic — Mostrar botón (solo esta visita)',menu_hide_fab:'Privacy Mosaic — Ocultar botón (solo esta visita)',menu_fabsite_add:'Privacy Mosaic — Mostrar siempre el botón en este sitio',menu_fabsite_remove:'Privacy Mosaic — Dejar de mostrar siempre el botón aquí',
      custom_rules:'Reglas personalizadas',add_rule:'+ Añadir regla',rule_manager:'Gestor de reglas',rm_all_sites:'Todos los sitios',
      detecting:'Modo detección — haz clic en un elemento. ESC para cancelar.',
      cancel_detect:'Cancelar',rule_name_lbl:'Nombre de regla',
      rule_name_ph:'Ej: Avatar, Nombre de usuario…',save_rule:'Guardar',
      no_rules:'Aún no hay reglas personalizadas.',rule_edit:'Re-detectar',rule_delete:'Eliminar',
      rule_edit_elsewhere:site=>`Visita ${site} para editar esta regla`,rule_offsite:'Otro sitio',
      confirm_delete:'¿Eliminar esta regla?',
      tab_masking:'Máscara',tab_rules:'Reglas',css_selector:'Selector CSS',site_lbl:'Sitio',
      redact_variant:'Estilo de tachado',rv_solid:'Sólido',rv_mosaic:'Mosaico',rv_checker:'Cuadrícula',rv_noise:'Ruido',
      ob_step:n=>`Paso ${n} de 3`,
      ob_welcome_title:'Bienvenido a Privacy Mosaic',ob_welcome_body:'Esto difumina o tacha automáticamente nombres de usuario, avatares e IDs en la página.',
      ob_rules_title:'La mayoría de los sitios necesitan reglas personalizadas',ob_rules_body:'Algunos sitios se reconocen automáticamente, pero la mayoría de las páginas requieren que añadas tu propia regla para lo que ocultar.',
      ob_next_title:'Comenzar',ob_next_body:'Abre la pestaña Reglas arriba y añade tu primera regla para empezar a enmascarar este sitio.',
      ob_next:'Siguiente',ob_skip:'Omitir',ob_gotit:'Entendido',
    },
    'pt-BR':{
      title:'Privacy Mosaic',enable:'Ativar máscara',
      desc_enable:'Desfoca ou redige nomes de usuário, avatares e IDs na página atual.',
      style_lbl:'Estilo',blur:'Desfoque',redact:'Redigir',
      intensity:'Intensidade',icon_size:'Tamanho do ícone',options:'Opções',
      persistent:'Sempre ativo',desc_persistent:'O mascaramento inicia automaticamente em cada nova página carregada.',
      
      fab_allowlist:'Mostrar botão neste site',desc_fab_allowlist:'O botão fica oculto por padrão. Ative para que ele apareça automaticamente sempre que este site for carregado.',default_rules:'Ativar regras padrão',desc_default_rules:n=>`Os ${n} seletores integrados (avatares, nomes de usuário, IDs) que funcionam na maioria dos sites. Desative para pará-los em todos os lugares; suas regras personalizadas continuam funcionando normalmente.`,highlight_default:'Destacar correspondências das regras padrão',desc_highlight_default:'Destaca com uma borda âmbar os elementos capturados pelas regras integradas, para diferenciá-los das suas regras personalizadas rapidamente.',
      def_list_toggle:n=>`Ver os ${n} seletores integrados`,def_list_avatar:'Avatares',def_list_handle:'Nomes de usuário',def_list_id:'IDs',def_list_count:n=>`${n} seletores`,
      def_sel_disable:'Desativar este seletor',def_sel_restore:'Restaurar este seletor',def_list_disabled_count:n=>`${n} desativados`,def_reset_all:'Redefinir todos os seletores desativados',def_group_disable:'Desativar todos os seletores deste grupo',def_group_enable:'Ativar todos os seletores deste grupo',def_group_disable_all:'Desativar todos os seletores integrados',def_group_enable_all:'Ativar todos os seletores integrados',defbar_on:n=>`Regras integradas ativas · ${n} correspondências`,defbar_idle:'Regras integradas ativas · sem correspondências nesta página',defbar_off:'As regras integradas estão desativadas',defbar_none:'Todos os seletores integrados estão desativados',defbar_tip:'Suas regras personalizadas somam-se às integradas: nunca as substituem nem entram em conflito.',defbar_manage:'Gerenciar',defbar_hl_tip:'Destacar em âmbar as correspondências integradas',no_rules_hint:n=>`As ${n} regras integradas já cobrem a maioria dos sites; talvez você não precise adicionar nenhuma.`,
      fab_allowlist_mgr:'Sites com o botão visível',fab_allowlist_ph:'Um domínio por linha, ex.\nexample.com\nanother-site.org',
      theme_dark:'Escuro',theme_light:'Claro',language:'Idioma',
      masked:n=>`${n} elemento${n!==1?'s':''} mascarado${n!==1?'s':''}`,hint:'Alt + Clique para excluir',
      close:'Fechar',menu_toggle:'Privacy Mosaic — Alternar máscara (também ativa Sempre ativo)',menu_panel:'Privacy Mosaic — Abrir painel',
      menu_lang:'Privacy Mosaic — Trocar idioma',
      reload_hint:'Idioma alterado. Recarregue a página para aplicar totalmente.',
      menu_show_fab:'Privacy Mosaic — Mostrar botão (só nesta visita)',menu_hide_fab:'Privacy Mosaic — Ocultar botão (só nesta visita)',menu_fabsite_add:'Privacy Mosaic — Sempre mostrar botão neste site',menu_fabsite_remove:'Privacy Mosaic — Parar de sempre mostrar botão aqui',
      custom_rules:'Regras personalizadas',add_rule:'+ Adicionar regra',rule_manager:'Gerenciador de regras',rm_all_sites:'Todos os sites',
      detecting:'Modo de detecção — clique em um elemento. ESC para cancelar.',
      cancel_detect:'Cancelar',rule_name_lbl:'Nome da regra',
      rule_name_ph:'Ex: Avatar, Nome de usuário…',save_rule:'Salvar',
      no_rules:'Nenhuma regra personalizada ainda.',rule_edit:'Re-detectar',rule_delete:'Excluir',
      rule_edit_elsewhere:site=>`Visite ${site} para editar esta regra`,rule_offsite:'Outro site',
      confirm_delete:'Excluir esta regra?',
      tab_masking:'Máscara',tab_rules:'Regras',css_selector:'Seletor CSS',site_lbl:'Site',
      redact_variant:'Estilo de redigir',rv_solid:'Sólido',rv_mosaic:'Mosaico',rv_checker:'Xadrez',rv_noise:'Ruído',
      ob_step:n=>`Passo ${n} de 3`,
      ob_welcome_title:'Bem-vindo ao Privacy Mosaic',ob_welcome_body:'Isso desfoca ou redige automaticamente nomes de usuário, avatares e IDs na página.',
      ob_rules_title:'A maioria dos sites precisa de regras personalizadas',ob_rules_body:'Alguns sites são reconhecidos automaticamente, mas a maioria das páginas exige que você adicione sua própria regra para o que ocultar.',
      ob_next_title:'Vamos começar',ob_next_body:'Abra a aba Regras acima e adicione sua primeira regra para começar a mascarar este site.',
      ob_next:'Próximo',ob_skip:'Pular',ob_gotit:'Entendi',
    },
    fr:{
      title:'Privacy Mosaic',enable:'Activer le masque',
      desc_enable:'Floute ou caviarde les noms d\'utilisateur, avatars et ID sur la page actuelle.',
      style_lbl:'Style',blur:'Flou',redact:'Caviarder',
      intensity:'Intensité',icon_size:'Taille de l\'icône',options:'Options',
      persistent:'Toujours actif',desc_persistent:'Le masquage démarre automatiquement à chaque nouvelle page chargée.',
      
      fab_allowlist:'Afficher le bouton sur ce site',desc_fab_allowlist:'Le bouton est masqué par défaut. Activez cette option pour qu\'il apparaisse automatiquement à chaque chargement de ce site.',default_rules:'Activer les règles par défaut',desc_default_rules:n=>`Les ${n} sélecteurs intégrés (avatars, noms d'utilisateur, ID) qui fonctionnent sur la plupart des sites. Désactivez pour les arrêter partout ; vos règles personnalisées continuent de fonctionner normalement.`,highlight_default:'Mettre en évidence les correspondances des règles par défaut',desc_highlight_default:'Entoure d\'un contour ambré les éléments détectés par les règles intégrées, pour les distinguer de vos règles personnalisées en un coup d\'œil.',
      def_list_toggle:n=>`Voir les ${n} sélecteurs intégrés`,def_list_avatar:'Avatars',def_list_handle:'Noms d\'utilisateur',def_list_id:'ID',def_list_count:n=>`${n} sélecteurs`,
      def_sel_disable:'Désactiver ce sélecteur',def_sel_restore:'Restaurer ce sélecteur',def_list_disabled_count:n=>`${n} désactivés`,def_reset_all:'Réinitialiser tous les sélecteurs désactivés',def_group_disable:'Désactiver tous les sélecteurs de ce groupe',def_group_enable:'Activer tous les sélecteurs de ce groupe',def_group_disable_all:'Désactiver tous les sélecteurs intégrés',def_group_enable_all:'Activer tous les sélecteurs intégrés',defbar_on:n=>`Règles intégrées actives · ${n} correspondances`,defbar_idle:'Règles intégrées actives · aucune correspondance sur cette page',defbar_off:'Les règles intégrées sont désactivées',defbar_none:'Tous les sélecteurs intégrés sont désactivés',defbar_tip:'Vos règles personnalisées s\'ajoutent aux règles intégrées : elles ne les remplacent ni n\'entrent en conflit.',defbar_manage:'Gérer',defbar_hl_tip:'Entourer en ambre les correspondances intégrées',no_rules_hint:n=>`Les ${n} règles intégrées couvrent déjà la plupart des sites ; vous n'aurez peut-être rien à ajouter.`,
      fab_allowlist_mgr:'Sites où le bouton est affiché',fab_allowlist_ph:'Un domaine par ligne, ex.\nexample.com\nanother-site.org',
      theme_dark:'Sombre',theme_light:'Clair',language:'Langue',
      masked:n=>`${n} élément${n!==1?'s':''} masqué${n!==1?'s':''}`,hint:'Alt + Clic pour exclure',
      close:'Fermer',menu_toggle:'Privacy Mosaic — Basculer le masque (active aussi Toujours actif)',menu_panel:'Privacy Mosaic — Ouvrir le panneau',
      menu_lang:'Privacy Mosaic — Changer de langue',
      reload_hint:'Langue modifiée. Rechargez la page pour l\'appliquer entièrement.',
      menu_show_fab:'Privacy Mosaic — Afficher le bouton (cette visite seulement)',menu_hide_fab:'Privacy Mosaic — Masquer le bouton (cette visite seulement)',menu_fabsite_add:'Privacy Mosaic — Toujours afficher le bouton sur ce site',menu_fabsite_remove:'Privacy Mosaic — Ne plus toujours afficher le bouton ici',
      custom_rules:'Règles personnalisées',add_rule:'+ Ajouter une règle',rule_manager:'Gestionnaire de règles',rm_all_sites:'Tous les sites',
      detecting:'Mode détection — cliquez sur un élément. ESC pour annuler.',
      cancel_detect:'Annuler',rule_name_lbl:'Nom de la règle',
      rule_name_ph:'Ex : Avatar, Nom d\'utilisateur…',save_rule:'Enregistrer',
      no_rules:'Aucune règle personnalisée.',rule_edit:'Re-détecter',rule_delete:'Supprimer',
      rule_edit_elsewhere:site=>`Rendez-vous sur ${site} pour modifier cette règle`,rule_offsite:'Autre site',
      confirm_delete:'Supprimer cette règle ?',
      tab_masking:'Masque',tab_rules:'Règles',css_selector:'Sélecteur CSS',site_lbl:'Site',
      redact_variant:'Style de caviardage',rv_solid:'Uni',rv_mosaic:'Mosaïque',rv_checker:'Damier',rv_noise:'Bruit',
      ob_step:n=>`Étape ${n} sur 3`,
      ob_welcome_title:'Bienvenue sur Privacy Mosaic',ob_welcome_body:'Ceci floute ou caviarde automatiquement les noms d\'utilisateur, avatars et ID sur la page.',
      ob_rules_title:'La plupart des sites nécessitent des règles personnalisées',ob_rules_body:'Certains sites sont reconnus automatiquement, mais la plupart des pages nécessitent que vous ajoutiez votre propre règle pour ce qu\'il faut masquer.',
      ob_next_title:'Commencer',ob_next_body:'Ouvrez l\'onglet Règles ci-dessus et ajoutez votre première règle pour commencer à masquer ce site.',
      ob_next:'Suivant',ob_skip:'Ignorer',ob_gotit:'Compris',
    },
    ru:{
      title:'Privacy Mosaic',enable:'Включить маску',
      desc_enable:'Размывает или скрывает имена, аватары и ID на текущей странице.',
      style_lbl:'Стиль',blur:'Размытие',redact:'Скрыть',
      intensity:'Интенсивность',icon_size:'Размер иконки',options:'Параметры',
      persistent:'Всегда включено',desc_persistent:'Маскировка запускается автоматически при каждой новой загрузке страницы.',
      
      fab_allowlist:'Показывать кнопку на этом сайте',desc_fab_allowlist:'Кнопка скрыта по умолчанию. Включите, чтобы она автоматически появлялась при каждой загрузке этого сайта.',default_rules:'Включить стандартные правила',desc_default_rules:n=>`${n} встроенных селекторов (аватары, имена пользователей, ID), работающих на большинстве сайтов. Отключите, чтобы остановить их везде — ваши собственные правила продолжат работать как обычно.`,highlight_default:'Выделять совпадения стандартных правил',desc_highlight_default:'Обводит янтарной рамкой элементы, найденные встроенными правилами, чтобы отличать их от ваших собственных правил с первого взгляда.',
      def_list_toggle:n=>`Показать ${n} встроенных селекторов`,def_list_avatar:'Аватары',def_list_handle:'Имена пользователей',def_list_id:'ID',def_list_count:n=>`${n} селекторов`,
      def_sel_disable:'Отключить этот селектор',def_sel_restore:'Восстановить этот селектор',def_list_disabled_count:n=>`отключено: ${n}`,def_reset_all:'Сбросить все отключённые селекторы',def_group_disable:'Отключить все селекторы этой группы',def_group_enable:'Включить все селекторы этой группы',def_group_disable_all:'Отключить все встроенные селекторы',def_group_enable_all:'Включить все встроенные селекторы',defbar_on:n=>`Встроенные правила активны · совпадений: ${n}`,defbar_idle:'Встроенные правила активны · на этой странице совпадений нет',defbar_off:'Встроенные правила отключены',defbar_none:'Все встроенные селекторы отключены',defbar_tip:'Ваши правила работают поверх встроенных: они не заменяют друг друга и не конфликтуют.',defbar_manage:'Управление',defbar_hl_tip:'Обводить совпадения встроенных правил янтарным',no_rules_hint:n=>`Встроенные ${n} правил уже охватывают большинство сайтов — возможно, добавлять свои не нужно.`,
      fab_allowlist_mgr:'Сайты с показанной кнопкой',fab_allowlist_ph:'По одному домену на строку, напр.\nexample.com\nanother-site.org',
      theme_dark:'Тёмная',theme_light:'Светлая',language:'Язык',
      masked:n=>`Скрыто ${n} элементов`,hint:'Alt + Клик для исключения',
      close:'Закрыть',menu_toggle:'Privacy Mosaic — Переключить маску (также включает «Всегда включено»)',menu_panel:'Privacy Mosaic — Открыть панель',
      menu_lang:'Privacy Mosaic — Сменить язык',
      reload_hint:'Язык изменён. Перезагрузите страницу, чтобы применить полностью.',
      menu_show_fab:'Privacy Mosaic — Показать кнопку (только сейчас)',menu_hide_fab:'Privacy Mosaic — Скрыть кнопку (только сейчас)',menu_fabsite_add:'Privacy Mosaic — Всегда показывать кнопку на этом сайте',menu_fabsite_remove:'Privacy Mosaic — Не показывать всегда кнопку здесь',
      custom_rules:'Пользовательские правила',add_rule:'+ Добавить правило',rule_manager:'Менеджер правил',rm_all_sites:'Все сайты',
      detecting:'Режим обнаружения — нажмите на элемент. ESC для отмены.',
      cancel_detect:'Отмена',rule_name_lbl:'Название правила',
      rule_name_ph:'Напр.: Аватар, Имя пользователя…',save_rule:'Сохранить',
      no_rules:'Нет пользовательских правил.',rule_edit:'Переобнаружить',rule_delete:'Удалить',
      rule_edit_elsewhere:site=>`Перейдите на ${site}, чтобы изменить это правило`,rule_offsite:'Другой сайт',
      confirm_delete:'Удалить это правило?',
      tab_masking:'Маска',tab_rules:'Правила',css_selector:'CSS-селектор',site_lbl:'Сайт',
      redact_variant:'Стиль скрытия',rv_solid:'Сплошной',rv_mosaic:'Мозаика',rv_checker:'Шахматка',rv_noise:'Шум',
      ob_step:n=>`Шаг ${n} из 3`,
      ob_welcome_title:'Добро пожаловать в Privacy Mosaic',ob_welcome_body:'Автоматически размывает или скрывает имена, аватары и ID на странице.',
      ob_rules_title:'Большинству сайтов нужны свои правила',ob_rules_body:'Некоторые сайты распознаются автоматически, но для большинства страниц нужно добавить своё правило для того, что скрывать.',
      ob_next_title:'Начать',ob_next_body:'Откройте вкладку «Правила» выше и добавьте своё первое правило, чтобы начать маскировку этого сайта.',
      ob_next:'Далее',ob_skip:'Пропустить',ob_gotit:'Понятно',
    },
    de:{
      title:'Privacy Mosaic',enable:'Maske aktivieren',
      desc_enable:'Verwischt oder schwärzt Benutzernamen, Avatare und IDs auf der aktuellen Seite.',
      style_lbl:'Stil',blur:'Weichzeichnen',redact:'Schwärzen',
      intensity:'Intensität',icon_size:'Symbolgröße',options:'Optionen',
      persistent:'Immer aktiv',desc_persistent:'Die Maskierung startet automatisch bei jedem neuen Seitenaufruf.',
      
      fab_allowlist:'Schaltfläche auf dieser Seite anzeigen',desc_fab_allowlist:'Die Schaltfläche ist standardmäßig ausgeblendet. Aktivieren, damit sie bei jedem Laden dieser Seite automatisch erscheint.',default_rules:'Standardregeln aktivieren',desc_default_rules:n=>`Die ${n} integrierten Selektoren (Avatare, Benutzernamen, IDs), die auf den meisten Seiten funktionieren. Deaktivieren, um sie überall zu stoppen — Ihre eigenen Regeln funktionieren weiterhin normal.`,highlight_default:'Treffer der Standardregeln hervorheben',desc_highlight_default:'Umrandet von den integrierten Regeln erfasste Elemente bernsteinfarben, damit Sie sie auf einen Blick von Ihren eigenen Regeln unterscheiden können.',
      def_list_toggle:n=>`Die ${n} integrierten Selektoren ansehen`,def_list_avatar:'Avatare',def_list_handle:'Benutzernamen',def_list_id:'IDs',def_list_count:n=>`${n} Selektoren`,
      def_sel_disable:'Diesen Selektor deaktivieren',def_sel_restore:'Diesen Selektor wiederherstellen',def_list_disabled_count:n=>`${n} deaktiviert`,def_reset_all:'Alle deaktivierten Selektoren zurücksetzen',def_group_disable:'Alle Selektoren dieser Gruppe deaktivieren',def_group_enable:'Alle Selektoren dieser Gruppe aktivieren',def_group_disable_all:'Alle integrierten Selektoren deaktivieren',def_group_enable_all:'Alle integrierten Selektoren aktivieren',defbar_on:n=>`Integrierte Regeln aktiv · ${n} Treffer`,defbar_idle:'Integrierte Regeln aktiv · keine Treffer auf dieser Seite',defbar_off:'Integrierte Regeln sind aus',defbar_none:'Alle integrierten Selektoren sind deaktiviert',defbar_tip:'Deine eigenen Regeln wirken zusätzlich zu den integrierten – sie ersetzen sich nie und stören sich nicht.',defbar_manage:'Verwalten',defbar_hl_tip:'Treffer integrierter Regeln bernsteinfarben umranden',no_rules_hint:n=>`Die ${n} integrierten Regeln decken bereits die meisten Seiten ab – vielleicht musst du keine hinzufügen.`,
      fab_allowlist_mgr:'Seiten mit sichtbarer Schaltfläche',fab_allowlist_ph:'Eine Domain pro Zeile, z.B.\nexample.com\nanother-site.org',
      theme_dark:'Dunkel',theme_light:'Hell',language:'Sprache',
      masked:n=>`${n} Element${n!==1?'e':''} maskiert`,hint:'Alt + Klick zum Ausschließen',
      close:'Schließen',menu_toggle:'Privacy Mosaic — Maske umschalten (aktiviert auch Immer aktiv)',menu_panel:'Privacy Mosaic — Panel öffnen',
      menu_lang:'Privacy Mosaic — Sprache wechseln',
      reload_hint:'Sprache geändert. Lade die Seite neu, damit sie vollständig übernommen wird.',
      menu_show_fab:'Privacy Mosaic — Symbol vorübergehend anzeigen (nur dieser Besuch)',menu_hide_fab:'Privacy Mosaic — Symbol vorübergehend ausblenden (nur dieser Besuch)',menu_fabsite_add:'Privacy Mosaic — Button auf dieser Seite immer anzeigen',menu_fabsite_remove:'Privacy Mosaic — Button hier nicht mehr immer anzeigen',
      custom_rules:'Eigene Regeln',add_rule:'+ Regel hinzufügen',rule_manager:'Regelverwaltung',rm_all_sites:'Alle Websites',
      detecting:'Erkennungsmodus — Element anklicken. ESC zum Abbrechen.',
      cancel_detect:'Abbrechen',rule_name_lbl:'Regelname',
      rule_name_ph:'Z.B. Avatar, Benutzername…',save_rule:'Speichern',
      no_rules:'Noch keine eigenen Regeln.',rule_edit:'Neu erkennen',rule_delete:'Löschen',
      rule_edit_elsewhere:site=>`Besuche ${site}, um diese Regel zu bearbeiten`,rule_offsite:'Andere Seite',
      confirm_delete:'Diese Regel löschen?',
      tab_masking:'Maske',tab_rules:'Regeln',css_selector:'CSS-Selektor',site_lbl:'Seite',
      redact_variant:'Schwärzungsstil',rv_solid:'Einfarbig',rv_mosaic:'Mosaik',rv_checker:'Schachbrett',rv_noise:'Rauschen',
      ob_step:n=>`Schritt ${n} von 3`,
      ob_welcome_title:'Willkommen bei Privacy Mosaic',ob_welcome_body:'Verwischt oder schwärzt automatisch Benutzernamen, Avatare und IDs auf der Seite.',
      ob_rules_title:'Die meisten Seiten benötigen eigene Regeln',ob_rules_body:'Einige Seiten werden automatisch erkannt, aber für die meisten Seiten müssen Sie eine eigene Regel hinzufügen, was verborgen werden soll.',
      ob_next_title:'Loslegen',ob_next_body:'Öffnen Sie oben den Tab „Regeln“ und fügen Sie Ihre erste Regel hinzu, um diese Seite zu maskieren.',
      ob_next:'Weiter',ob_skip:'Überspringen',ob_gotit:'Verstanden',
    },
    it:{
      title:'Privacy Mosaic',enable:'Abilita maschera',
      desc_enable:'Sfoca o oscura nomi utente, avatar e ID nella pagina corrente.',
      style_lbl:'Stile',blur:'Sfocatura',redact:'Oscura',
      intensity:'Intensità',icon_size:'Dimensione icona',options:'Opzioni',
      persistent:'Sempre attivo',desc_persistent:'Il mascheramento si avvia automaticamente ad ogni nuova pagina caricata.',
      
      fab_allowlist:'Mostra pulsante su questo sito',desc_fab_allowlist:'Il pulsante è nascosto per impostazione predefinita. Attiva per mostrarlo automaticamente ogni volta che carichi questo sito.',default_rules:'Attiva regole predefinite',desc_default_rules:n=>`I ${n} selettori integrati (avatar, nomi utente, ID) che funzionano sulla maggior parte dei siti. Disattiva per interromperli ovunque; le tue regole personalizzate continuano a funzionare normalmente.`,highlight_default:'Evidenzia corrispondenze delle regole predefinite',desc_highlight_default:'Evidenzia con un bordo ambra gli elementi rilevati dalle regole integrate, per distinguerli dalle tue regole personalizzate a colpo d\'occhio.',
      def_list_toggle:n=>`Vedi i ${n} selettori integrati`,def_list_avatar:'Avatar',def_list_handle:'Nomi utente',def_list_id:'ID',def_list_count:n=>`${n} selettori`,
      def_sel_disable:'Disattiva questo selettore',def_sel_restore:'Ripristina questo selettore',def_list_disabled_count:n=>`${n} disattivati`,def_reset_all:'Ripristina tutti i selettori disattivati',def_group_disable:'Disattiva tutti i selettori di questo gruppo',def_group_enable:'Attiva tutti i selettori di questo gruppo',def_group_disable_all:'Disattiva tutti i selettori integrati',def_group_enable_all:'Attiva tutti i selettori integrati',defbar_on:n=>`Regole integrate attive · ${n} corrispondenze`,defbar_idle:'Regole integrate attive · nessuna corrispondenza in questa pagina',defbar_off:'Le regole integrate sono disattivate',defbar_none:'Tutti i selettori integrati sono disattivati',defbar_tip:'Le tue regole personalizzate si sommano a quelle integrate: non le sostituiscono né entrano in conflitto.',defbar_manage:'Gestisci',defbar_hl_tip:'Evidenzia in ambra le corrispondenze integrate',no_rules_hint:n=>`Le ${n} regole integrate coprono già la maggior parte dei siti; forse non serve aggiungerne.`,
      fab_allowlist_mgr:'Siti con pulsante visibile',fab_allowlist_ph:'Un dominio per riga, es.\nexample.com\nanother-site.org',
      theme_dark:'Scuro',theme_light:'Chiaro',language:'Lingua',
      masked:n=>`${n} element${n!==1?'i':'o'} mascherato${n!==1?'i':''}`,hint:'Alt + Clic per escludere',
      close:'Chiudi',menu_toggle:'Privacy Mosaic — Attiva/disattiva maschera (attiva anche Sempre attivo)',menu_panel:'Privacy Mosaic — Apri pannello',
      menu_lang:'Privacy Mosaic — Cambia lingua',
      reload_hint:'Lingua cambiata. Ricarica la pagina per applicarla completamente.',
      menu_show_fab:'Privacy Mosaic — Mostra pulsante (solo questa visita)',menu_hide_fab:'Privacy Mosaic — Nascondi pulsante (solo questa visita)',menu_fabsite_add:'Privacy Mosaic — Mostra sempre il pulsante su questo sito',menu_fabsite_remove:'Privacy Mosaic — Non mostrare più sempre il pulsante qui',
      custom_rules:'Regole personalizzate',add_rule:'+ Aggiungi regola',rule_manager:'Gestione regole',rm_all_sites:'Tutti i siti',
      detecting:'Modalità rilevamento — clicca un elemento. ESC per annullare.',
      cancel_detect:'Annulla',rule_name_lbl:'Nome regola',
      rule_name_ph:'Es: Avatar, Nome utente…',save_rule:'Salva',
      no_rules:'Nessuna regola personalizzata.',rule_edit:'Ri-rileva',rule_delete:'Elimina',
      rule_edit_elsewhere:site=>`Vai su ${site} per modificare questa regola`,rule_offsite:'Altro sito',
      confirm_delete:'Eliminare questa regola?',
      tab_masking:'Maschera',tab_rules:'Regole',css_selector:'Selettore CSS',site_lbl:'Sito',
      redact_variant:'Stile oscuramento',rv_solid:'Tinta unita',rv_mosaic:'Mosaico',rv_checker:'Scacchiera',rv_noise:'Rumore',
      ob_step:n=>`Passo ${n} di 3`,
      ob_welcome_title:'Benvenuto in Privacy Mosaic',ob_welcome_body:'Sfoca o oscura automaticamente nomi utente, avatar e ID nella pagina.',
      ob_rules_title:'La maggior parte dei siti richiede regole personalizzate',ob_rules_body:'Alcuni siti vengono riconosciuti automaticamente, ma la maggior parte delle pagine richiede l\'aggiunta di una propria regola per ciò che nascondere.',
      ob_next_title:'Inizia',ob_next_body:'Apri la scheda Regole in alto e aggiungi la tua prima regola per iniziare a mascherare questo sito.',
      ob_next:'Avanti',ob_skip:'Salta',ob_gotit:'Capito',
    },
    tr:{
      title:'Privacy Mosaic',enable:'Maskelemeyi etkinleştir',
      desc_enable:'Mevcut sayfadaki kullanıcı adlarını, avatarları ve kimlikleri bulanıklaştırır veya sansürler.',
      style_lbl:'Stil',blur:'Bulanıklaştır',redact:'Sansürle',
      intensity:'Yoğunluk',icon_size:'Simge boyutu',options:'Seçenekler',
      persistent:'Her zaman açık',desc_persistent:'Her yeni sayfa yüklendiğinde maskeleme otomatik olarak başlar.',
      
      fab_allowlist:'Bu sitede düğmeyi göster',desc_fab_allowlist:'Düğme varsayılan olarak gizlidir. Açarsanız, bu siteyi her yüklediğinizde otomatik olarak görünür.',default_rules:'Varsayılan kuralları etkinleştir',desc_default_rules:n=>`Çoğu sitede çalışan ${n} yerleşik seçici (avatarlar, kullanıcı adları, kimlikler). Kapatırsanız her yerde durdurulur; özel kurallarınız normal şekilde çalışmaya devam eder.`,highlight_default:'Varsayılan kural eşleşmelerini vurgula',desc_highlight_default:'Yerleşik kurallar tarafından yakalanan öğeleri kehribar renginde bir çerçeveyle vurgular, böylece özel kurallarınızdan bir bakışta ayırt edebilirsiniz.',
      def_list_toggle:n=>`${n} yerleşik seçiciyi görüntüle`,def_list_avatar:'Avatarlar',def_list_handle:'Kullanıcı adları',def_list_id:'Kimlikler',def_list_count:n=>`${n} seçici`,
      def_sel_disable:'Bu seçiciyi devre dışı bırak',def_sel_restore:'Bu seçiciyi geri yükle',def_list_disabled_count:n=>`${n} devre dışı`,def_reset_all:'Devre dışı bırakılan tüm seçicileri sıfırla',def_group_disable:'Bu gruptaki tüm seçicileri devre dışı bırak',def_group_enable:'Bu gruptaki tüm seçicileri etkinleştir',def_group_disable_all:'Tüm yerleşik seçicileri devre dışı bırak',def_group_enable_all:'Tüm yerleşik seçicileri etkinleştir',defbar_on:n=>`Yerleşik kurallar etkin · ${n} eşleşme`,defbar_idle:'Yerleşik kurallar etkin · bu sayfada eşleşme yok',defbar_off:'Yerleşik kurallar kapalı',defbar_none:'Tüm yerleşik seçiciler devre dışı',defbar_tip:'Özel kurallarınız yerleşik kuralların üzerine eklenir; birbirinin yerini almaz ve çakışmaz.',defbar_manage:'Yönet',defbar_hl_tip:'Yerleşik eşleşmeleri kehribar rengiyle çerçevele',no_rules_hint:n=>`Yerleşik ${n} kural çoğu siteyi zaten kapsıyor; belki hiç kural eklemeniz gerekmez.`,
      fab_allowlist_mgr:'Düğmenin gösterildiği siteler',fab_allowlist_ph:'Satır başına bir alan adı, örn.\nexample.com\nanother-site.org',
      theme_dark:'Koyu',theme_light:'Açık',language:'Dil',
      masked:n=>`${n} öğe maskelendi`,hint:'Dışlamak için Alt + Tıkla',
      close:'Kapat',menu_toggle:'Privacy Mosaic — Maskeyi değiştir (Her zaman açık\'ı da ayarlar)',menu_panel:'Privacy Mosaic — Paneli aç',
      menu_lang:'Privacy Mosaic — Dili değiştir',
      reload_hint:'Dil değiştirildi. Tam olarak uygulanması için sayfayı yenileyin.',
      menu_show_fab:'Privacy Mosaic — Düğmeyi geçici göster (yalnızca bu ziyaret)',menu_hide_fab:'Privacy Mosaic — Düğmeyi geçici gizle (yalnızca bu ziyaret)',menu_fabsite_add:'Privacy Mosaic — Bu sitede düğmeyi her zaman göster',menu_fabsite_remove:'Privacy Mosaic — Burada her zaman göstermeyi durdur',
      custom_rules:'Özel kurallar',add_rule:'+ Kural ekle',rule_manager:'Kural yöneticisi',rm_all_sites:'Tüm siteler',
      detecting:'Algılama modu — bir öğeye tıklayın. İptal için ESC.',
      cancel_detect:'İptal',rule_name_lbl:'Kural adı',
      rule_name_ph:'Örn: Avatar, Kullanıcı adı…',save_rule:'Kaydet',
      no_rules:'Henüz özel kural yok.',rule_edit:'Yeniden algıla',rule_delete:'Sil',
      rule_edit_elsewhere:site=>`Bu kuralı düzenlemek için ${site} adresine gidin`,rule_offsite:'Diğer site',
      confirm_delete:'Bu kuralı silmek istiyor musunuz?',
      tab_masking:'Maske',tab_rules:'Kurallar',css_selector:'CSS Seçici',site_lbl:'Site',
      redact_variant:'Sansürleme stili',rv_solid:'Düz',rv_mosaic:'Mozaik',rv_checker:'Dama',rv_noise:'Gürültü',
      ob_step:n=>`Adım ${n}/3`,
      ob_welcome_title:'Privacy Mosaic\'e hoş geldiniz',ob_welcome_body:'Sayfadaki kullanıcı adlarını, avatarları ve kimlikleri otomatik olarak bulanıklaştırır veya sansürler.',
      ob_rules_title:'Çoğu site özel kurallara ihtiyaç duyar',ob_rules_body:'Bazı siteler otomatik olarak tanınır, ancak çoğu sayfada gizlenecek şeyi belirtmek için kendi kuralınızı eklemeniz gerekir.',
      ob_next_title:'Başlayalım',ob_next_body:'Yukarıdaki Kurallar sekmesini açın ve bu siteyi maskelemeye başlamak için ilk kuralınızı ekleyin.',
      ob_next:'İleri',ob_skip:'Atla',ob_gotit:'Anladım',
    },
  };

  const LANG_OPTIONS=[
    {value:'en',   label:'🇺🇸 English'},
    {value:'zh-TW',label:'🇹🇼 繁體中文'},
    {value:'zh-CN',label:'🇨🇳 简体中文'},
    {value:'ja',   label:'🇯🇵 日本語'},
    {value:'ko',   label:'🇰🇷 한국어'},
    {value:'es',   label:'🇪🇸 Español'},
    {value:'pt-BR',label:'🇧🇷 Português (Brasil)'},
    {value:'fr',   label:'🇫🇷 Français'},
    {value:'ru',   label:'🇷🇺 Русский'},
    {value:'de',   label:'🇩🇪 Deutsch'},
    {value:'it',   label:'🇮🇹 Italiano'},
    {value:'tr',   label:'🇹🇷 Türkçe'},
  ];

  const P        = 'pm';
  const STORE    = 'pm_cfg_v4';
  const DEBOUNCE = 350;
  const FAB_REVEAL_MS = 3000;

  const AVATAR_SEL = [
    '[data-testid^="UserAvatar-Container"]',
    'img.avatar','img[class*="avatar"]','img[class*="Avatar"]',
    'img[class*="profile-pic"]','img[class*="profilePic"]','img[class*="profile-photo"]',
    'img[class*="profile-img"]','img[class*="user-icon"]','img[class*="userIcon"]',
    '[class*="avatar"] img','[class*="Avatar"] img',
    '[class*="user-thumbnail"] img','[class*="profile-image"] img',
    '[data-testid*="avatar"] img','[data-testid*="Avatar"] img',
    '[class*="UserAvatar"] img','[class*="user_avatar"] img',
  ];
  const HANDLE_SEL = [
    '[class*="username"]','[class*="userName"]','[class*="UserName"]',
    '[class*="user-name"]','[class*="user_name"]',
    '[class*="user-handle"]','[class*="userHandle"]',
    '[class*="display-name"]','[class*="displayName"]',
    '[class*="screen-name"]','[class*="screenName"]',
    '[class*="author-name"]','[class*="authorName"]',
    '[class*="poster-name"]','[class*="posterName"]',
    '[class*="nick-name"]','[class*="nickname"]',
    'a[href^="/@"]','a[href^="/user/"]','a[href^="/u/"]',
    'a[href^="/member/"]','a[href^="/profile/"]',
    '[data-testid*="user-name"]','[data-testid*="username"]','[data-testid*="UserName"]',
    'span[class*="mention"]','a[class*="mention"]',
    '[data-testid="User-Name"]',
    '[data-testid="UserDescription"]',
  ];
  const ID_SEL = [
    '[class*="user-id"]','[class*="userId"]','[class*="user_id"]',
    '[data-userid]','[data-user-id]','[data-author-id]',
    '[class*="member-id"]','[class*="memberId"]',
  ];
  const ALL_SEL     = [...AVATAR_SEL,...HANDLE_SEL,...ID_SEL];
  const ALL_SEL_STR = ALL_SEL.join(',');
  const GUARD       = `#${P}-panel, .${P}-fab-wrap, #${P}-detect-bar, #${P}-rule-dialog, #${P}-rule-dialog-backdrop, #${P}-confirm-dialog, #${P}-confirm-backdrop, #${P}-lang-dialog, #${P}-lang-dialog-backdrop, #${P}-rv-drop, #${P}-toast, #${P}-rulemgr, #${P}-rulemgr-backdrop, .${P}-intro-ring`;

  let cfg={style:'blur',intensity:8,persistent:false,fabAllowlist:[],iconSize:36,lang:'',theme:'dark',customRules:[],panelX:null,panelY:null,redactVariant:'solid',onboarded:false,defaultRulesEnabled:true,highlightDefaultRules:false,disabledDefaultSelectors:[]};
  let enabled=false;
  let detectMode=false, detectHoverEl=null, detectEditId=null;
  let panelEl=null,fabWrapEl=null;
  let toggleEl=null,countEl=null,ivalEl=null,isizeEl=null;
  let observerRef=null,scanTimer=null,pendingNodes=new Set();
  let onboardStep=0;
  let sessionFabOverride=null;
  let fabSessionReveal=false,fabRevealTimer=null;

  function detectLang(){
    if(cfg.lang)return cfg.lang;
    const nav=(navigator.language||'en').toLowerCase();
    if(nav.startsWith('zh-tw')||nav.startsWith('zh-hant'))return 'zh-TW';
    if(nav.startsWith('zh'))return 'zh-CN';
    if(nav.startsWith('ja'))return 'ja';
    if(nav.startsWith('ko'))return 'ko';
    if(nav.startsWith('es'))return 'es';
    if(nav.startsWith('pt'))return 'pt-BR';
    if(nav.startsWith('fr'))return 'fr';
    if(nav.startsWith('ru'))return 'ru';
    if(nav.startsWith('de'))return 'de';
    if(nav.startsWith('it'))return 'it';
    if(nav.startsWith('tr'))return 'tr';
    return 'en';
  }
  function t(key){const l=detectLang();return(I18N[l]||I18N.en)[key]??(I18N.en[key]??key);}

  function loadCfg(){
    try{Object.assign(cfg,JSON.parse(GM_getValue(STORE,'{}')))}catch(_){}
    if(cfg.style==='pixelate')cfg.style='blur';
    if(!Array.isArray(cfg.fabAllowlist))cfg.fabAllowlist=[];
    if('fabHidden' in cfg)delete cfg.fabHidden;
    if(typeof cfg.defaultRulesEnabled!=='boolean')cfg.defaultRulesEnabled=true;
    if(typeof cfg.highlightDefaultRules!=='boolean')cfg.highlightDefaultRules=false;
    if(!Array.isArray(cfg.disabledDefaultSelectors))cfg.disabledDefaultSelectors=[];
    else cfg.disabledDefaultSelectors=cfg.disabledDefaultSelectors.filter(s=>ALL_SEL.includes(s));
  }
  function saveCfg(){GM_setValue(STORE,JSON.stringify(cfg));}

  let _activeSelStrCache=null;
  function invalidateSelCache(){_activeSelStrCache=null;}
  function getActiveSelStr(){
    if(_activeSelStrCache===null){
      _activeSelStrCache=cfg.disabledDefaultSelectors.length
        ?ALL_SEL.filter(s=>!cfg.disabledDefaultSelectors.includes(s)).join(',')
        :ALL_SEL_STR;
    }
    return _activeSelStrCache;
  }

  function escapeHtmlText(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function escapeHtmlAttr(s){
    return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function escapeUrl(s){
    try{
      const u=new URL(String(s),location.href);
      return ['http:','https:'].includes(u.protocol)?u.href:'';
    }catch(_){return '';}
  }
  const pmTTPolicy=(()=>{
    try{
      if(typeof trustedTypes==='undefined'||!trustedTypes.createPolicy)return null;
      return trustedTypes.createPolicy(`${P}-tt`,{createHTML:s=>s});
    }catch(_){return null;}
  })();
  function trustedHTML(s){
    return pmTTPolicy?pmTTPolicy.createHTML(String(s)):s;
  }

  const SKELETON_VARS=['--pm-sk-base','--pm-sk-shine'];
  const THEMES={
    dark:{
      '--pm-bg':'#13131f','--pm-bg2':'#1a1a2e','--pm-border':'#2e2e5a','--pm-border2':'#222248',
      '--pm-text':'#d0d0ee','--pm-text2':'#9898c8','--pm-text3':'#6868a0','--pm-desc':'#8080b8',
      '--pm-accent':'#5858e0','--pm-accent-bg':'#20206a',
      '--pm-sw-off':'#1e1e3c','--pm-sw-border':'#303068','--pm-sw-knob':'#5858a0',
      '--pm-amber':'#c49000','--pm-amber-bg':'#7a5800','--pm-amber-tag-bg':'#664600',
      '--pm-close-bg':'#1a1a36','--pm-btn-bg':'#181830','--pm-btn-on-bg':'#282898',
      '--pm-btn-on-bd':'#5050e0','--pm-btn-on-tx':'#d0d0ff','--pm-input-bg':'#111122',
      '--pm-sk-base':'#1e1e32','--pm-sk-shine':'#2e2e4a',
      '--pm-rule-bg':'#111128','--pm-rule-border':'#1e1e48',
      '--pm-shadow':'0 12px 40px rgba(0,0,14,.85), 0 0 0 1px rgba(80,80,200,.1)',
    },
    light:{
      '--pm-bg':'#ffffff','--pm-bg2':'#f4f4f8','--pm-border':'#d0d0e0','--pm-border2':'#e0e0ee',
      '--pm-text':'#1a1a2e','--pm-text2':'#3a3a60','--pm-text3':'#6868a0','--pm-desc':'#6c6c9c',
      '--pm-accent':'#4040c8','--pm-accent-bg':'#e8e8ff',
      '--pm-sw-off':'#d8d8ec','--pm-sw-border':'#b0b0d0','--pm-sw-knob':'#7878b0',
      '--pm-amber':'#b07800','--pm-amber-bg':'#ffe0a0','--pm-amber-tag-bg':'#ffe0a0',
      '--pm-close-bg':'#ebebf5','--pm-btn-bg':'#ebebf8','--pm-btn-on-bg':'#4444cc',
      '--pm-btn-on-bd':'#3333aa','--pm-btn-on-tx':'#ffffff','--pm-input-bg':'#f0f0f8',
      '--pm-sk-base':'#dcdce8','--pm-sk-shine':'#ececf6',
      '--pm-rule-bg':'#f0f0f8','--pm-rule-border':'#d8d8ec',
      '--pm-shadow':'0 8px 32px rgba(0,0,60,.14), 0 0 0 1px rgba(80,80,200,.12)',
    },
  };

  function applyTheme(theme){
    const vars=THEMES[theme]||THEMES.dark;
    const panel=document.getElementById(`${P}-panel`);
    const rvDrop=document.getElementById(`${P}-rv-drop`);
    const ruleMgr=document.getElementById(`${P}-rulemgr`);
    Object.entries(vars).forEach(([k,v])=>{
      if(SKELETON_VARS.includes(k)) document.documentElement.style.setProperty(k,v);
      if(panel) panel.style.setProperty(k,v);
      if(rvDrop) rvDrop.style.setProperty(k,v);
      if(ruleMgr) ruleMgr.style.setProperty(k,v);
    });
  }

  function applyHighlightDefault(){
    document.documentElement.classList.toggle(`${P}-hl-default`,!!cfg.highlightDefaultRules);
  }

  function injectStyles(){
    GM_addStyle(`
      
      ${GUARD}{user-select:none!important;}

      .${P}-blur{filter:blur(var(--pm-r,8px))!important;transition:filter .15s ease;}
      .${P}-blur:hover{filter:blur(0)!important;}

      .${P}-redact{position:relative!important;}
      .${P}-redact::after{
        content:''!important;position:absolute!important;inset:0!important;
        border-radius:6px!important;z-index:9999!important;pointer-events:none!important;
        opacity:1!important;transition:opacity .2s ease!important;
        background:linear-gradient(90deg,var(--pm-sk-base,#1e1e32) 25%,var(--pm-sk-shine,#2e2e4a) 50%,var(--pm-sk-base,#1e1e32) 75%)!important;
        background-size:200% 100%!important;
        animation:${P}-shimmer 1.6s ease-in-out infinite!important;
      }
      .${P}-redact:hover::after{opacity:0!important;}
      .${P}-redact:hover .${P}-sk-overlay{display:none!important;}
      .${P}-redact:hover .${P}-img-hidden{display:inline-block!important;}
      @keyframes ${P}-shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}

      html.${P}-hl-default .${ACTIVE}[data-pm-src="default"],
      html.${P}-hl-default .${P}-sk-overlay[data-pm-src="default"]{
        outline:2px dashed var(--pm-amber)!important;outline-offset:2px!important;
        box-shadow:0 0 0 4px var(--pm-amber-bg)!important;border-radius:4px!important;
      }

      .${P}-redact[data-pm-rv="mosaic"]::after{
        animation:none!important;
        background:repeating-conic-gradient(
          from 0deg at 12.5% 12.5%,
          #3a3a52 0deg 90deg,#2e2e44 90deg 180deg,#45455f 180deg 270deg,#35354c 270deg 360deg
        )!important;
        background-size:var(--pm-tile,8px) var(--pm-tile,8px)!important;
      }
      
      .${P}-redact[data-pm-rv="checker"]::after{
        animation:none!important;
        background-image:
          linear-gradient(to right, rgba(90,90,100,.96) 50%, rgba(40,40,48,.96) 50%),
          linear-gradient(to bottom, rgba(90,90,100,.96) 50%, rgba(60,60,70,.96) 50%)!important;
        background-size:var(--pm-tile,8px) var(--pm-tile,8px),var(--pm-tile,8px) var(--pm-tile,8px)!important;
        background-blend-mode:multiply!important;
      }
      
      .${P}-redact[data-pm-rv="noise"]::after{
        animation:none!important;
        background-color:#2a2a3a!important;
        background-image:
          radial-gradient(circle at 20% 30%, rgba(255,255,255,.05) 1px, transparent 1px),
          radial-gradient(circle at 70% 60%, rgba(255,255,255,.04) 1px, transparent 1px),
          radial-gradient(circle at 40% 80%, rgba(255,255,255,.06) 1px, transparent 1px)!important;
        background-size:6px 6px!important;
      }

      .${P}-img-hidden{display:none!important;}
      .${P}-sk-overlay{
        display:inline-block!important;
        background:linear-gradient(90deg,var(--pm-sk-base,#1e1e32) 25%,var(--pm-sk-shine,#2e2e4a) 50%,var(--pm-sk-base,#1e1e32) 75%)!important;
        background-size:200% 100%!important;
        animation:${P}-shimmer 1.6s ease-in-out infinite!important;
        vertical-align:middle!important;
      }

      .${P}-fab-wrap{
        all:initial;position:fixed!important;top:0!important;left:50%!important;
        transform:translateX(-50%)!important;z-index:2147483646!important;
        display:flex!important;flex-direction:column!important;align-items:center!important;
      }
      #${P}-fab{
        all:initial;display:flex!important;align-items:center!important;justify-content:center!important;
        border-radius:50%!important;background:rgba(10,10,28,.84)!important;
        border:2px solid #32327a!important;padding:7px!important;box-sizing:border-box!important;
        box-shadow:0 2px 14px rgba(0,0,12,.6)!important;opacity:0!important;pointer-events:auto!important;
        transition:opacity .22s ease,border-color .2s,background .2s,box-shadow .2s!important;
        cursor:pointer!important;user-select:none!important;
      }
      #${P}-fab svg{display:block!important;}
      
      .${P}-fab-wrap:hover #${P}-fab,.${P}-fab-wrap.show #${P}-fab{opacity:1!important;}
      .${P}-fab-wrap:hover #${P}-fab.${P}-on,.${P}-fab-wrap.show #${P}-fab.${P}-on{
        border-color:#6060e8!important;background:rgba(20,20,64,.94)!important;
        box-shadow:0 0 0 3px rgba(96,96,232,.25),0 2px 14px rgba(0,0,12,.6)!important;
      }
      
      @keyframes ${P}-fab-intro-pulse{
        0%{transform:scale(.3);opacity:.9}
        60%{transform:scale(1.3);opacity:.25}
        100%{transform:scale(1.6);opacity:0}
      }
      
      .${P}-intro-ring{
        position:fixed!important;pointer-events:none!important;z-index:2147483646!important;
        border-radius:50%!important;border:2px solid #6464c8!important;
        animation:${P}-fab-intro-pulse 2s ease-in-out 1!important;
      }

      #${P}-panel{
        all:initial;position:fixed!important;
        z-index:2147483645!important;
        width:min(420px,calc(100vw - 32px))!important;box-sizing:border-box!important;
        font-family:system-ui,-apple-system,'Segoe UI',sans-serif!important;
        font-size:14px!important;line-height:1.5!important;border-radius:16px!important;
        display:none!important;flex-direction:column!important;
        max-height:min(600px,calc(100vh - 32px))!important;
        background:var(--pm-bg)!important;color:var(--pm-text)!important;
        border:1px solid var(--pm-border)!important;box-shadow:var(--pm-shadow)!important;
      }
      #${P}-panel.open{display:flex!important;}

      .${P}-drag-handle{
        display:flex!important;align-items:center!important;flex-shrink:0!important;
        color:var(--pm-text3)!important;cursor:grab!important;user-select:none!important;
        padding:0 8px 0 0!important;opacity:.5!important;
        transition:opacity .15s!important;
      }
      .${P}-drag-handle:hover{opacity:1!important;}
      .${P}-drag-handle.dragging{cursor:grabbing!important;opacity:1!important;}

      .${P}-tabs{
        display:flex!important;border-bottom:1px solid var(--pm-border2)!important;
        padding:0 20px!important;flex-shrink:0!important;
      }
      .${P}-tab{
        flex:1!important;padding:10px 0!important;text-align:center!important;
        font-size:12px!important;font-weight:600!important;color:var(--pm-text3)!important;
        cursor:pointer!important;border-bottom:2px solid transparent!important;
        margin-bottom:-1px!important;
        transition:color .15s,border-color .15s!important;user-select:none!important;
      }
      .${P}-tab:hover{color:var(--pm-text2)!important;}
      .${P}-tab.on{color:var(--pm-text)!important;border-bottom-color:var(--pm-accent)!important;}

      .${P}-tab-body{
        max-height:min(420px,calc(95vh - 148px))!important;overflow-y:auto!important;
        scrollbar-width:thin!important;scrollbar-color:var(--pm-border) transparent!important;
      }
      .${P}-tab-pnl{
        display:none!important;flex-direction:column!important;
        gap:14px!important;padding:18px 20px!important;
      }
      .${P}-tab-pnl.on{display:flex!important;}

      .${P}-panel-foot{
        padding:10px 20px 14px!important;flex-shrink:0!important;
        border-top:1px solid var(--pm-border2)!important;
        display:flex!important;flex-direction:column!important;gap:4px!important;
      }
      .${P}-phdr{display:flex!important;align-items:center!important;justify-content:space-between!important;
        gap:6px!important;padding:12px 14px 10px!important;flex-shrink:0!important;
        border-bottom:1px solid var(--pm-border2)!important;}
      .${P}-title{font-size:15px!important;font-weight:700!important;color:var(--pm-text)!important;letter-spacing:.02em!important;flex:1!important;}
      
      .${P}-hbtn{
        display:flex!important;align-items:center!important;justify-content:center!important;
        width:28px!important;height:28px!important;border-radius:7px!important;
        border:1px solid var(--pm-border2)!important;background:var(--pm-close-bg)!important;
        cursor:pointer!important;flex-shrink:0!important;font-size:15px!important;line-height:1!important;
        transition:background .15s,border-color .15s!important;user-select:none!important;}
      .${P}-hbtn:hover{background:var(--pm-bg2)!important;border-color:var(--pm-accent)!important;}
      
      #${P}-lang-btn{font-size:11px!important;font-weight:700!important;color:var(--pm-text2)!important;
        min-width:28px!important;padding:0 4px!important;letter-spacing:.02em!important;}
      #${P}-lang-btn:hover{color:var(--pm-text)!important;}
      
      #${P}-lang-drop{
        display:none!important;position:absolute!important;top:44px!important;right:36px!important;
        z-index:2147483647!important;min-width:160px!important;
        max-height:min(320px,calc(100vh - 80px))!important;overflow-y:auto!important;overflow-x:hidden!important;
        background:var(--pm-bg)!important;border:1px solid var(--pm-border)!important;
        border-radius:10px!important;box-shadow:0 8px 24px rgba(0,0,20,.6)!important;
        flex-direction:column!important;}
      #${P}-lang-drop.open{display:flex!important;}
      .${P}-lang-opt{
        padding:8px 14px!important;font-size:12px!important;color:var(--pm-text2)!important;
        cursor:pointer!important;transition:background .12s!important;user-select:none!important;
        white-space:nowrap!important;}
      .${P}-lang-opt:hover{background:var(--pm-bg2)!important;color:var(--pm-text)!important;}
      .${P}-lang-opt.active{color:var(--pm-accent)!important;font-weight:600!important;}
      
      .${P}-close{display:flex!important;align-items:center!important;justify-content:center!important;
        width:28px!important;height:28px!important;border-radius:7px!important;
        border:1px solid var(--pm-border2)!important;background:var(--pm-close-bg)!important;
        cursor:pointer!important;flex-shrink:0!important;transition:background .15s,border-color .15s!important;}
      .${P}-close svg{display:block!important;}
      .${P}-close svg path{stroke:var(--pm-text3)!important;transition:stroke .15s!important;}
      .${P}-close:hover{background:var(--pm-bg2)!important;border-color:var(--pm-accent)!important;}
      .${P}-close:hover svg path{stroke:var(--pm-text)!important;}
      
      .${P}-reset{
        font-size:10px!important;padding:2px 7px!important;border-radius:5px!important;
        border:1px solid var(--pm-border2)!important;background:var(--pm-btn-bg)!important;
        color:var(--pm-text3)!important;cursor:pointer!important;flex-shrink:0!important;
        transition:all .15s!important;user-select:none!important;line-height:1.4!important;}
      .${P}-reset:hover{border-color:var(--pm-accent)!important;color:var(--pm-text)!important;}
      .${P}-slbl{font-size:11px!important;font-weight:700!important;letter-spacing:.1em!important;
        text-transform:uppercase!important;color:var(--pm-text3)!important;}
      .${P}-row{display:flex!important;align-items:center!important;gap:10px!important;}
      .${P}-rlbl{flex:1!important;font-size:14px!important;font-weight:500!important;color:var(--pm-text)!important;}
      .${P}-desc{font-size:12px!important;color:var(--pm-desc)!important;line-height:1.45!important;margin-top:2px!important;}
      .${P}-sw{width:44px!important;height:24px!important;border-radius:12px!important;
        background:var(--pm-sw-off)!important;border:1px solid var(--pm-sw-border)!important;
        cursor:pointer!important;position:relative!important;flex-shrink:0!important;
        transition:background .2s,border-color .2s!important;}
      .${P}-sw.on{background:var(--pm-accent)!important;border-color:var(--pm-accent)!important;}
      .${P}-sw::before{content:''!important;position:absolute!important;top:3px!important;left:3px!important;
        width:16px!important;height:16px!important;border-radius:50%!important;
        background:var(--pm-sw-knob)!important;transition:left .2s,background .2s!important;}
      .${P}-sw.on::before{left:23px!important;background:#fff!important;}
      .${P}-sw.persist.on{background:var(--pm-amber-bg)!important;border-color:var(--pm-amber)!important;}
      .${P}-sw.persist.on::before{left:23px!important;background:#ffd060!important;}
      .${P}-sw-sm{width:36px!important;height:20px!important;border-radius:10px!important;}
      .${P}-sw-sm::before{width:14px!important;height:14px!important;top:2px!important;left:2px!important;}
      .${P}-sw-sm.on::before{left:20px!important;}
      .${P}-rule-badge{font-size:10px!important;color:var(--pm-text3)!important;
        background:var(--pm-btn-bg)!important;border:1px solid var(--pm-border2)!important;
        border-radius:4px!important;padding:1px 5px!important;width:fit-content!important;
        line-height:1.4!important;cursor:help!important;}
      .${P}-def-list{margin-top:12px!important;}
      
      .${P}-def-summary{
        font-size:12px!important;font-weight:600!important;color:var(--pm-text)!important;
        cursor:pointer!important;user-select:none!important;list-style:none!important;
        display:flex!important;align-items:center!important;justify-content:space-between!important;gap:8px!important;
        padding:8px 10px!important;border-radius:8px!important;
        background:var(--pm-btn-bg)!important;border:1px solid var(--pm-border)!important;
        transition:background .15s,border-color .15s!important;
      }
      .${P}-def-summary:hover{background:var(--pm-bg2)!important;border-color:var(--pm-accent)!important;}
      .${P}-def-list[open] .${P}-def-summary{border-color:var(--pm-accent)!important;}
      .${P}-def-summary::-webkit-details-marker{display:none!important;}
      .${P}-def-summary>span:first-child{
        display:flex!important;align-items:center!important;gap:8px!important;flex:1!important;min-width:0!important;
      }
      .${P}-def-chev{
        width:7px!important;height:7px!important;flex-shrink:0!important;box-sizing:border-box!important;
        border-right:2px solid var(--pm-accent)!important;border-bottom:2px solid var(--pm-accent)!important;
        transform:rotate(-45deg)!important;transition:transform .15s!important;margin:0 2px!important;
      }
      .${P}-def-list[open] .${P}-def-chev{transform:rotate(45deg)!important;}
      .${P}-def-summary-right{display:flex!important;align-items:center!important;gap:8px!important;flex-shrink:0!important;}
      .${P}-def-group-hdr{
        font-size:11px!important;font-weight:600!important;color:var(--pm-text3)!important;
        margin:10px 0 4px!important;display:flex!important;align-items:center!important;gap:6px!important;
      }
      .${P}-def-group-hdr>.${P}-def-group-name{flex:1!important;}
      .${P}-def-group-count{font-weight:400!important;opacity:.7!important;}
      
      .${P}-def-gsw{cursor:pointer!important;flex-shrink:0!important;}
      .${P}-def-gsw.mixed{background:var(--pm-accent-bg)!important;border-color:var(--pm-accent)!important;}
      .${P}-def-gsw.mixed::before{left:11px!important;background:var(--pm-accent)!important;}
      .${P}-def-reset{
        display:block!important;width:100%!important;margin:8px 0 10px!important;
        font-size:11px!important;font-weight:600!important;color:var(--pm-amber)!important;
        background:var(--pm-btn-bg)!important;border:1px solid var(--pm-amber)!important;
        border-radius:6px!important;padding:6px!important;cursor:pointer!important;
      }
      .${P}-def-reset:hover{background:var(--pm-amber-bg)!important;}
      .${P}-def-sel{
        font-size:10px!important;color:#e0c060!important;word-break:break-all!important;
        background:#0a0a18!important;border:1px solid #1e1e48!important;
        border-radius:4px!important;padding:4px 7px!important;font-family:monospace!important;
        margin-bottom:3px!important;display:flex!important;align-items:center!important;
        justify-content:space-between!important;gap:8px!important;
      }
      .${P}-def-sel.off{opacity:.4!important;}
      .${P}-def-sel.off .${P}-def-sel-text{text-decoration:line-through!important;}
      .${P}-def-sel-text{flex:1!important;min-width:0!important;}
      .${P}-def-sel-btn{
        flex-shrink:0!important;cursor:pointer!important;font-family:initial!important;
        color:var(--pm-text3)!important;padding:0 2px!important;
      }
      .${P}-def-sel-btn:hover{color:var(--pm-text)!important;}
      .${P}-btns{display:grid!important;grid-template-columns:repeat(2,1fr)!important;gap:6px!important;}
      .${P}-btn{
        display:flex!important;flex-direction:column!important;align-items:center!important;
        gap:5px!important;padding:8px 4px 7px!important;border-radius:8px!important;
        font-size:11px!important;font-weight:600!important;color:var(--pm-text2)!important;
        background:var(--pm-btn-bg)!important;border:1px solid var(--pm-border2)!important;
        cursor:pointer!important;transition:all .15s!important;user-select:none!important;}
      .${P}-btn svg{width:52px!important;height:32px!important;flex-shrink:0!important;border-radius:4px!important;}
      .${P}-btn:hover{color:var(--pm-text)!important;border-color:var(--pm-border)!important;}
      .${P}-btn.on{background:var(--pm-btn-on-bg)!important;border-color:var(--pm-btn-on-bd)!important;
        color:var(--pm-btn-on-tx)!important;box-shadow:0 0 10px rgba(80,80,220,.25)!important;}
      .${P}-sl{width:100%!important;accent-color:var(--pm-accent)!important;cursor:pointer!important;margin:0!important;}
      .${P}-sl:disabled{opacity:.35!important;cursor:not-allowed!important;}
      .${P}-val{font-size:12px!important;color:var(--pm-text2)!important;min-width:36px!important;text-align:right!important;}
      .${P}-hr{border:none!important;border-top:1px solid var(--pm-border2)!important;margin:0!important;}
      .${P}-foot{font-size:12px!important;color:var(--pm-text3)!important;text-align:center!important;}
      .${P}-hint{font-size:11px!important;color:var(--pm-desc)!important;text-align:center!important;}

      .${P}-rule-item{
        display:flex!important;align-items:flex-start!important;gap:8px!important;
        padding:9px 10px!important;border-radius:8px!important;
        background:var(--pm-rule-bg)!important;border:1px solid var(--pm-rule-border)!important;
      }
      .${P}-rule-main{
        flex:1!important;min-width:0!important;display:flex!important;
        flex-direction:column!important;gap:4px!important;padding-top:2px!important;
      }
      .${P}-rule-name{font-size:13px!important;color:var(--pm-text)!important;
        overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;}
      .${P}-rule-icons{display:flex!important;align-items:center!important;gap:2px!important;
        flex-shrink:0!important;padding-top:2px!important;}
      .${P}-rule-icon{font-size:14px!important;cursor:pointer!important;color:var(--pm-text3)!important;
        flex-shrink:0!important;padding:2px!important;border-radius:4px!important;
        transition:color .15s!important;line-height:1!important;user-select:none!important;}
      .${P}-rule-icon:hover{color:var(--pm-text)!important;}
      .${P}-rule-no{font-size:12px!important;color:var(--pm-desc)!important;text-align:center!important;padding:4px 0!important;}
      .${P}-add-rule-btn{
        width:100%!important;padding:8px!important;border-radius:8px!important;
        border:1px dashed var(--pm-border)!important;background:transparent!important;
        color:var(--pm-text2)!important;font-size:13px!important;font-weight:600!important;
        cursor:pointer!important;text-align:center!important;
        transition:border-color .15s,color .15s,background .15s!important;user-select:none!important;
      }
      .${P}-add-rule-btn:hover{border-color:var(--pm-accent)!important;color:var(--pm-text)!important;background:var(--pm-bg2)!important;}
      .${P}-rulemgr-btn{
        font-size:11px!important;font-weight:600!important;color:var(--pm-text2)!important;
        background:var(--pm-bg2)!important;border:1px solid var(--pm-border2)!important;
        border-radius:6px!important;padding:4px 9px!important;cursor:pointer!important;
        user-select:none!important;white-space:nowrap!important;flex-shrink:0!important;
        transition:border-color .15s,color .15s!important;
      }
      .${P}-rulemgr-btn:hover{border-color:var(--pm-accent)!important;color:var(--pm-text)!important;}

      .${P}-defbar{
        display:flex!important;align-items:center!important;gap:8px!important;
        padding:7px 9px!important;border-radius:8px!important;margin-bottom:8px!important;
        background:var(--pm-accent-bg)!important;border:1px solid var(--pm-accent)!important;
        font-size:11.5px!important;color:var(--pm-text)!important;
      }
      .${P}-defbar.idle{background:var(--pm-btn-bg)!important;border-color:var(--pm-border)!important;}
      .${P}-defbar.off{background:var(--pm-btn-bg)!important;border-color:var(--pm-border2)!important;
        color:var(--pm-text3)!important;}
      .${P}-defbar-ico{flex-shrink:0!important;font-size:13px!important;line-height:1!important;}
      .${P}-defbar-txt{flex:1!important;min-width:0!important;line-height:1.35!important;cursor:help!important;}
      .${P}-defbar-hl{
        flex-shrink:0!important;cursor:pointer!important;font-size:12px!important;line-height:1!important;
        padding:3px 4px!important;border-radius:5px!important;border:1px solid transparent!important;
        opacity:.55!important;transition:opacity .15s,background .15s,border-color .15s!important;user-select:none!important;
      }
      .${P}-defbar-hl:hover{opacity:1!important;}
      .${P}-defbar-hl.on{opacity:1!important;background:var(--pm-amber-bg)!important;border-color:var(--pm-amber)!important;}
      .${P}-defbar-mgr{
        flex-shrink:0!important;cursor:pointer!important;font-weight:600!important;
        color:var(--pm-accent)!important;user-select:none!important;white-space:nowrap!important;
      }
      .${P}-defbar-mgr:hover{text-decoration:underline!important;}
      .${P}-defbar.off .${P}-defbar-mgr{color:var(--pm-text2)!important;}
      
      .${P}-rule-no-hint{display:block!important;margin-top:4px!important;font-size:11px!important;
        color:var(--pm-desc)!important;line-height:1.4!important;}

      #${P}-detect-bar{
        all:initial;position:fixed!important;top:0!important;left:0!important;right:0!important;
        z-index:2147483647!important;padding:12px 20px!important;
        display:flex!important;align-items:center!important;gap:12px!important;
        background:rgba(20,20,60,.96)!important;backdrop-filter:blur(8px)!important;
        border-bottom:1px solid #4444b0!important;
        font-family:system-ui,-apple-system,sans-serif!important;
        font-size:13px!important;color:#c0c0ff!important;box-sizing:border-box!important;
      }
      #${P}-detect-bar span{flex:1!important;}
      #${P}-detect-cancel{
        padding:4px 14px!important;border-radius:6px!important;border:1px solid #5050c0!important;
        background:#181848!important;color:#a0a0ff!important;cursor:pointer!important;
        font-size:12px!important;white-space:nowrap!important;user-select:none!important;
        transition:background .15s!important;
      }
      #${P}-detect-cancel:hover{background:#282880!important;}

      .${P}-detect-hl{outline:2px solid #5858e0!important;outline-offset:2px!important;cursor:crosshair!important;}

      #${P}-rule-dialog{
        all:initial;position:fixed!important;top:50%!important;left:50%!important;
        transform:translate(-50%,-50%)!important;z-index:2147483647!important;
        width:320px!important;background:#13131f!important;border:1px solid #3030a0!important;
        border-radius:14px!important;padding:22px!important;box-sizing:border-box!important;
        font-family:system-ui,-apple-system,sans-serif!important;
        box-shadow:0 20px 60px rgba(0,0,20,.9)!important;
        display:none!important;flex-direction:column!important;gap:14px!important;
      }
      #${P}-rule-dialog.open{display:flex!important;}
      #${P}-rule-dialog-backdrop{
        all:initial;position:fixed!important;inset:0!important;z-index:2147483646!important;
        background:rgba(0,0,0,.55)!important;display:none!important;
      }
      #${P}-rule-dialog-backdrop.open{display:block!important;}
      .${P}-rd-title{font-size:15px!important;font-weight:700!important;color:#c0c0ff!important;}
      .${P}-rd-sel{
        font-size:10px!important;color:#5858a0!important;word-break:break-all!important;
        background:#0a0a18!important;border:1px solid #1e1e48!important;
        border-radius:6px!important;padding:6px 8px!important;font-family:monospace!important;
      }
      .${P}-rd-sel.readonly{opacity:.55!important;cursor:not-allowed!important;}
      .${P}-rd-input{
        width:100%!important;box-sizing:border-box!important;
        background:#111128!important;border:1px solid #3030a0!important;
        border-radius:8px!important;padding:8px 10px!important;
        color:#d0d0ff!important;font-size:13px!important;outline:none!important;
      }
      .${P}-rd-input:focus{border-color:#6060e0!important;}
      .${P}-fablist-ta{
        width:100%!important;box-sizing:border-box!important;resize:vertical!important;
        min-height:64px!important;max-height:160px!important;margin-top:6px!important;
        background:var(--pm-input-bg)!important;border:1px solid var(--pm-border)!important;
        border-radius:8px!important;padding:8px 10px!important;
        color:var(--pm-text)!important;font-size:12px!important;font-family:monospace!important;
        outline:none!important;line-height:1.5!important;
      }
      .${P}-fablist-ta:focus{border-color:var(--pm-accent)!important;}
      .${P}-fablist-ta::placeholder{color:var(--pm-text3)!important;}
      .${P}-rd-lbl{font-size:12px!important;color:#6868a0!important;}
      .${P}-rd-actions{display:flex!important;gap:8px!important;justify-content:flex-end!important;}
      .${P}-rd-btn{
        padding:7px 18px!important;border-radius:8px!important;font-size:13px!important;
        font-weight:600!important;cursor:pointer!important;user-select:none!important;
        transition:all .15s!important;
      }
      .${P}-rd-btn.cancel{background:#1a1a36!important;border:1px solid #2e2e60!important;color:#7070b0!important;}
      .${P}-rd-btn.cancel:hover{border-color:#5050a0!important;color:#a0a0d0!important;}
      .${P}-rd-btn.save{background:#3030a0!important;border:1px solid #5050e0!important;color:#d0d0ff!important;}
      .${P}-rd-btn.save:hover{background:#4040c0!important;}

      #${P}-rulemgr{
        all:initial;position:fixed!important;top:50%!important;left:50%!important;
        transform:translate(-50%,-50%)!important;z-index:2147483647!important;
        width:min(440px,calc(100vw - 32px))!important;box-sizing:border-box!important;
        height:clamp(640px,80vh,700px)!important;max-height:calc(100vh - 32px)!important;
        font-family:system-ui,-apple-system,'Segoe UI',sans-serif!important;
        font-size:14px!important;line-height:1.5!important;border-radius:16px!important;
        display:none!important;flex-direction:column!important;overflow:hidden!important;
        background:var(--pm-bg)!important;color:var(--pm-text)!important;
        border:1px solid var(--pm-border)!important;box-shadow:0 20px 60px rgba(0,0,20,.9)!important;
      }
      #${P}-rulemgr.open{display:flex!important;}
      #${P}-rulemgr-backdrop{
        all:initial;position:fixed!important;inset:0!important;z-index:2147483646!important;
        background:rgba(0,0,0,.55)!important;display:none!important;
      }
      #${P}-rulemgr-backdrop.open{display:block!important;}
      .${P}-rm-hdr{
        display:flex!important;align-items:center!important;gap:8px!important;
        padding:16px 20px!important;flex-shrink:0!important;
        border-bottom:1px solid var(--pm-border2)!important;
      }
      .${P}-rm-title{font-size:15px!important;font-weight:700!important;flex:1!important;color:var(--pm-text)!important;}
      .${P}-rm-body{flex:1!important;overflow-y:auto!important;padding:16px 20px!important;}
      .${P}-rm-group{margin-bottom:12px!important;}
      .${P}-rm-group-hdr{
        display:flex!important;align-items:center!important;gap:8px!important;
        margin-bottom:6px!important;padding-bottom:4px!important;
        border-bottom:1px solid var(--pm-border2)!important;
      }
      .${P}-rm-favicon{
        width:16px!important;height:16px!important;border-radius:3px!important;
        flex-shrink:0!important;background:var(--pm-input-bg)!important;
      }
      .${P}-rm-domain{font-size:13px!important;font-weight:600!important;color:var(--pm-text2)!important;flex:1!important;}
      .${P}-rm-count{font-size:11px!important;color:var(--pm-text3)!important;}

      .${P}-rule-item.${P}-rule-compact{
        align-items:center!important;padding:5px 8px!important;gap:8px!important;border-radius:6px!important;
        margin-bottom:4px!important;
      }
      .${P}-rule-compact .${P}-sw{margin-top:0!important;}
      .${P}-rule-compact .${P}-rule-main{
        flex-direction:row!important;align-items:center!important;gap:6px!important;padding-top:0!important;
      }
      .${P}-rule-compact .${P}-rule-name{flex:0 1 auto!important;min-width:0!important;font-size:12.5px!important;}
      .${P}-rule-compact .${P}-rule-badge{flex-shrink:0!important;font-size:9.5px!important;padding:0 4px!important;}
      .${P}-rule-compact .${P}-rule-icons{padding-top:0!important;}
      .${P}-rule-compact .${P}-rule-icon{font-size:13px!important;}

      .${P}-rm-toggles{margin-bottom:18px!important;}

      .${P}-rm-empty{
        text-align:center!important;color:var(--pm-text3)!important;
        font-size:13px!important;padding:30px 10px!important;
      }

      #${P}-confirm-dialog{
        all:initial;position:fixed!important;top:50%!important;left:50%!important;
        transform:translate(-50%,-50%)!important;z-index:2147483647!important;
        width:280px!important;background:#13131f!important;border:1px solid #3030a0!important;
        border-radius:14px!important;padding:20px!important;box-sizing:border-box!important;
        font-family:system-ui,-apple-system,sans-serif!important;
        box-shadow:0 20px 60px rgba(0,0,20,.9)!important;
        display:none!important;flex-direction:column!important;gap:14px!important;
      }
      #${P}-confirm-dialog.open{display:flex!important;}
      #${P}-confirm-backdrop{
        all:initial;position:fixed!important;inset:0!important;z-index:2147483646!important;
        background:rgba(0,0,0,.55)!important;display:none!important;
      }
      #${P}-confirm-backdrop.open{display:block!important;}
      .${P}-cf-msg{font-size:13px!important;color:#c0c0ff!important;line-height:1.5!important;}
      .${P}-cf-actions{display:flex!important;gap:8px!important;justify-content:flex-end!important;}

      #${P}-toast{
        all:initial;position:fixed!important;left:50%!important;bottom:32px!important;
        transform:translate(-50%,12px)!important;z-index:2147483647!important;
        max-width:320px!important;background:#13131f!important;border:1px solid #3030a0!important;
        border-radius:12px!important;padding:12px 16px!important;box-sizing:border-box!important;
        font-family:system-ui,-apple-system,sans-serif!important;font-size:13px!important;
        color:#c0c0ff!important;line-height:1.5!important;
        box-shadow:0 12px 40px rgba(0,0,20,.85)!important;
        opacity:0!important;pointer-events:none!important;
        transition:opacity .2s ease,transform .2s ease!important;
      }
      #${P}-toast.show{opacity:1!important;transform:translate(-50%,0)!important;pointer-events:auto!important;}

      #${P}-lang-dialog{
        all:initial;position:fixed!important;top:50%!important;left:50%!important;
        transform:translate(-50%,-50%)!important;z-index:2147483647!important;
        width:240px!important;max-height:70vh!important;background:#13131f!important;
        border:1px solid #3030a0!important;border-radius:14px!important;
        padding:18px!important;box-sizing:border-box!important;
        font-family:system-ui,-apple-system,sans-serif!important;
        box-shadow:0 20px 60px rgba(0,0,20,.9)!important;
        display:none!important;flex-direction:column!important;gap:10px!important;
      }
      #${P}-lang-dialog.open{display:flex!important;}
      #${P}-lang-dialog-backdrop{
        all:initial;position:fixed!important;inset:0!important;z-index:2147483646!important;
        background:rgba(0,0,0,.55)!important;display:none!important;
      }
      #${P}-lang-dialog-backdrop.open{display:block!important;}
      #${P}-lang-dialog-list{
        display:flex!important;flex-direction:column!important;gap:2px!important;
        overflow-y:auto!important;max-height:calc(70vh - 56px)!important;
        margin:0 -8px!important;padding:0 8px!important;
      }
      
      #${P}-lang-dialog-list .${P}-lang-opt{
        border-radius:8px!important;font-size:13px!important;padding:9px 12px!important;
        color:#9898c8!important;
      }
      #${P}-lang-dialog-list .${P}-lang-opt:hover{background:#1a1a2e!important;color:#d0d0ee!important;}
      #${P}-lang-dialog-list .${P}-lang-opt.active{color:#5858e0!important;font-weight:600!important;}

      .${P}-ob{
        background:var(--pm-accent-bg)!important;border:1px solid var(--pm-accent)!important;
        border-radius:10px!important;padding:12px!important;margin-bottom:12px!important;
        flex-direction:column!important;gap:8px!important;
      }
      
      .${P}-ob-step{font-size:11px!important;color:var(--pm-text3)!important;font-weight:600!important;
        text-transform:uppercase!important;letter-spacing:.02em!important;}
      .${P}-ob-title{font-size:13px!important;font-weight:700!important;color:var(--pm-text)!important;}
      .${P}-ob-body{font-size:12px!important;color:var(--pm-text2)!important;line-height:1.5!important;}
      .${P}-ob-actions{display:flex!important;gap:8px!important;justify-content:flex-end!important;margin-top:2px!important;}
      .${P}-ob-btn{
        font-size:12px!important;padding:6px 12px!important;border-radius:7px!important;
        cursor:pointer!important;user-select:none!important;border:1px solid transparent!important;
        transition:background .15s,border-color .15s!important;
      }
      .${P}-ob-btn.skip{color:var(--pm-text3)!important;background:transparent!important;}
      .${P}-ob-btn.skip:hover{color:var(--pm-text2)!important;}
      .${P}-ob-btn.next{background:var(--pm-accent)!important;color:#fff!important;font-weight:600!important;}
      .${P}-ob-btn.next:hover{filter:brightness(1.1)!important;}

      .${P}-rv-toggle{
        position:absolute!important;top:3px!important;right:3px!important;
        width:16px!important;height:16px!important;border-radius:4px!important;
        display:flex!important;align-items:center!important;justify-content:center!important;
        font-size:10px!important;line-height:1!important;color:var(--pm-text3)!important;
        background:rgba(0,0,0,.25)!important;cursor:pointer!important;user-select:none!important;
        transition:background .15s,color .15s!important;
      }
      .${P}-rv-toggle:hover{background:rgba(0,0,0,.4)!important;color:var(--pm-text)!important;}
      
      .${P}-rv-drop{
        display:none!important;position:fixed!important;
        z-index:2147483647!important;min-width:130px!important;
        max-height:min(220px,calc(100vh - 80px))!important;overflow-y:auto!important;overflow-x:hidden!important;
        background:var(--pm-bg)!important;border:1px solid var(--pm-border)!important;
        border-radius:10px!important;box-shadow:0 8px 24px rgba(0,0,20,.6)!important;
        flex-direction:column!important;
      }
      .${P}-rv-drop.open{display:flex!important;}
      .${P}-rv-opt{
        padding:8px 12px!important;font-size:12px!important;color:var(--pm-text2)!important;
        cursor:pointer!important;transition:background .12s!important;user-select:none!important;
        white-space:nowrap!important;text-align:left!important;font-weight:400!important;
      }
      .${P}-rv-opt:hover{background:var(--pm-bg2)!important;color:var(--pm-text)!important;}
      .${P}-rv-opt.active{color:var(--pm-accent)!important;font-weight:600!important;}
    `);
  }

  function fabIconSVG(size){
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}">
      <rect x="3" y="3" width="8" height="8" rx="1.2" fill="#6868d8"/>
      <rect x="13" y="3" width="8" height="8" rx="1.2" fill="#4444bc"/>
      <rect x="3" y="13" width="8" height="8" rx="1.2" fill="#4444bc"/>
      <rect x="13" y="13" width="8" height="8" rx="1.2" fill="#6868d8"/>
    </svg>`;
  }

  function setFabWrapPadding(wrap,size){
    const buf=8;
    wrap.style.padding=`0 ${buf}px ${buf}px`;
    wrap.style.minWidth=`${size+14+buf*2}px`;
  }

  function buildFab(){
    const wrap=document.createElement('div');
    wrap.className=`${P}-fab-wrap`;
    setFabWrapPadding(wrap,cfg.iconSize);
    const fab=document.createElement('div');
    fab.id=`${P}-fab`;
    fab.innerHTML=trustedHTML(fabIconSVG(cfg.iconSize));
    fab.style.cssText=`width:${cfg.iconSize+14}px;height:${cfg.iconSize+14}px;`;
    if(enabled) fab.classList.add(`${P}-on`);
    fab.addEventListener('click',e=>{e.stopPropagation();onMasterToggle();});
    fab.addEventListener('contextmenu',e=>{e.preventDefault();e.stopPropagation();panelEl?.classList.contains('open')?closePanel():openPanel();});
    wrap.appendChild(fab);
    document.body.appendChild(wrap);
    fabWrapEl=wrap;
    applyFabHidden();
    updateFabTitle();
    if(isFabAllowedHere())triggerFabIntroPulse();
  }

  function triggerFabIntroPulse(){
    setTimeout(()=>{
      const fab=document.getElementById(`${P}-fab`);
      if(!fab)return;
      const r=fab.getBoundingClientRect();
      if(!r.width&&!r.height)return;
      const ring=document.createElement('div');
      ring.className=`${P}-intro-ring`;
      const size=r.width;
      ring.style.cssText=`left:${Math.round(r.left)}px;top:${Math.round(r.top)}px;width:${size}px;height:${size}px;`;
      ring.addEventListener('animationend',()=>ring.remove(),{once:true});
      document.body.appendChild(ring);
    },500);
  }

  function updateFabTitle(){
    const fab=document.getElementById(`${P}-fab`);
    if(fab) fab.title=`${t('menu_toggle').replace('Privacy Mosaic — ','')}  |  right-click: ${t('menu_panel').replace('Privacy Mosaic — ','')}`;
  }

  function buildPanel(){
    const panel=document.createElement('div');
    panel.id=`${P}-panel`;
    document.body.appendChild(panel);
    panelEl=panel;
    initPanel();
    makeDraggable(panel);

    panel.addEventListener('click',e=>{
      const tab=e.target.closest(`.${P}-tab`);
      if(!tab)return;
      panel.querySelectorAll(`.${P}-tab`).forEach(t=>t.classList.remove('on'));
      panel.querySelectorAll(`.${P}-tab-pnl`).forEach(p=>p.classList.remove('on'));
      tab.classList.add('on');
      const tp=panel.querySelector(`#${P}-tp-${tab.dataset.tab}`);
      if(tp)tp.classList.add('on');
    });

    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'){
        if(document.getElementById(`${P}-rulemgr`)?.classList.contains('open'))return;
        if(detectMode){exitDetectMode();return;}
        if(panel.classList.contains('open')) closePanel();
      }
    });
  }

  function initPanel(){
    const langOptsHtml=`<div class="${P}-lang-opt${cfg.lang===''?' active':''}" data-lv="">🌐 Auto</div>`+
      LANG_OPTIONS.map(o=>`<div class="${P}-lang-opt${cfg.lang===o.value?' active':''}" data-lv="${o.value}">${o.label}</div>`).join('');
    const langLabel=cfg.lang===''?'🌐':(LANG_OPTIONS.find(o=>o.value===cfg.lang)?.label.slice(0,4)||'🌐');

    panelEl.innerHTML=trustedHTML(`
      <div class="${P}-phdr" style="position:relative!important;">
        <span class="${P}-drag-handle" title="Drag to reposition · Double-click to reset">
          <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
            <circle cx="3" cy="4" r="1.5"/><circle cx="7" cy="4" r="1.5"/>
            <circle cx="3" cy="8" r="1.5"/><circle cx="7" cy="8" r="1.5"/>
            <circle cx="3" cy="12" r="1.5"/><circle cx="7" cy="12" r="1.5"/>
          </svg>
        </span>
        <span class="${P}-title">🔒 ${t('title')}</span>
        <span id="${P}-lang-btn" class="${P}-hbtn" title="${t('language')}">${langLabel}</span>
        <div id="${P}-lang-drop">${langOptsHtml}</div>
        <span id="${P}-theme-btn" class="${P}-hbtn" title="${cfg.theme==='dark'?t('theme_light'):t('theme_dark')}">${cfg.theme==='dark'?'☀️':'🌙'}</span>
        <span id="${P}-close" class="${P}-close" title="${t('close')}">
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 1l8 8M9 1l-8 8" stroke-width="1.8" stroke-linecap="round"/></svg>
        </span>
      </div>
      <div class="${P}-tabs">
        <div class="${P}-tab on" data-tab="masking">${t('tab_masking')}</div>
        <div class="${P}-tab" data-tab="options">${t('options')}</div>
        <div class="${P}-tab" data-tab="rules">${t('tab_rules')}</div>
      </div>
      <div class="${P}-tab-body">
        <div class="${P}-tab-pnl on" id="${P}-tp-masking">
          <div id="${P}-ob" class="${P}-ob" style="display:none;"></div>
          <div class="${P}-row">
            <span id="${P}-lbl-enable" class="${P}-rlbl">${t('enable')}</span>
            <div id="${P}-sw" class="${P}-sw ${enabled?'on':''}"></div>
          </div>
          <div id="${P}-desc-enable" class="${P}-desc">${t('desc_enable')}</div>
          <hr class="${P}-hr">
          <span id="${P}-lbl-style" class="${P}-slbl">${t('style_lbl')}</span>
          <div class="${P}-btns">
            <div class="${P}-btn ${cfg.style==='blur'?'on':''}" data-s="blur" id="${P}-btn-blur">
              <svg viewBox="0 0 52 32" width="52" height="32"><defs><filter id="pm-sf-blur"><feGaussianBlur stdDeviation="2.2"/></filter></defs><circle cx="14" cy="16" r="10" fill="#6464c8" filter="url(#pm-sf-blur)"/><rect x="28" y="9" width="22" height="6" rx="3" fill="#6464c8" filter="url(#pm-sf-blur)"/><rect x="28" y="19" width="14" height="5" rx="3" fill="#9090c0" filter="url(#pm-sf-blur)"/></svg>
              <span class="${P}-btn-lbl">${t('blur')}</span>
            </div>
            <div class="${P}-btn ${cfg.style==='redact'?'on':''}" data-s="redact" id="${P}-btn-redact" style="position:relative!important;">
              <svg viewBox="0 0 52 32" width="52" height="32"><defs><linearGradient id="pm-sf-rg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1e1e3a"/><stop offset="50%" stop-color="#2e2e58"/><stop offset="100%" stop-color="#1e1e3a"/></linearGradient></defs><circle cx="14" cy="16" r="10" fill="#6464c8" opacity=".12"/><rect x="28" y="9" width="22" height="6" rx="3" fill="#6464c8" opacity=".12"/><rect x="28" y="19" width="14" height="5" rx="3" fill="#9090c0" opacity=".12"/><rect x="4" y="5" width="20" height="22" rx="4" fill="url(#pm-sf-rg)"/><rect x="27" y="8" width="24" height="7" rx="2" fill="url(#pm-sf-rg)"/><rect x="27" y="18" width="16" height="6" rx="2" fill="url(#pm-sf-rg)"/></svg>
              <span class="${P}-btn-lbl">${t('redact')}</span>
              <span id="${P}-rv-toggle" class="${P}-rv-toggle" title="${t('redact_variant')}">⚙</span>
            </div>
          </div>
          <hr class="${P}-hr">
          <div class="${P}-row">
            <span id="${P}-lbl-intensity" class="${P}-rlbl">${t('intensity')}</span>
            <button id="${P}-sl-reset" class="${P}-reset">↺</button>
            <span id="${P}-ival" class="${P}-val">${cfg.intensity}px</span>
          </div>
          <input id="${P}-sl" class="${P}-sl" type="range" min="2" max="40" value="${cfg.intensity}" ${cfg.style==='redact'?'disabled':''}>
        </div>
        <div class="${P}-tab-pnl" id="${P}-tp-options">
          <div class="${P}-row">
            <span id="${P}-lbl-persistent" class="${P}-rlbl">🔁 ${t('persistent')}</span>
            <div id="${P}-persist" class="${P}-sw persist ${cfg.persistent?'on':''}"></div>
          </div>
          <div id="${P}-desc-persistent" class="${P}-desc">${t('desc_persistent')}</div>
          <div class="${P}-row">
            <span id="${P}-lbl-fabhidden" class="${P}-rlbl">🔲 ${t('fab_allowlist')}</span>
            <div id="${P}-fabsite" class="${P}-sw ${cfg.fabAllowlist.includes(location.hostname)?'on':''}"></div>
          </div>
          <div id="${P}-desc-fabhidden" class="${P}-desc">${t('desc_fab_allowlist')}</div>
          <span id="${P}-lbl-fablist" class="${P}-slbl">${t('fab_allowlist_mgr')}</span>
          <textarea id="${P}-fablist" class="${P}-fablist-ta" placeholder="${escapeHtmlAttr(t('fab_allowlist_ph')).replace(/\n/g,'&#10;')}" spellcheck="false">${escapeHtmlText(cfg.fabAllowlist.join('\n'))}</textarea>
          <hr class="${P}-hr">
          <div class="${P}-row">
            <span id="${P}-lbl-iconsize" class="${P}-rlbl">${t('icon_size')}</span>
            <button id="${P}-szsl-reset" class="${P}-reset">↺</button>
            <span id="${P}-isize" class="${P}-val">${cfg.iconSize}px</span>
          </div>
          <input id="${P}-szsl" class="${P}-sl" type="range" min="6" max="96" value="${cfg.iconSize}">
        </div>
        <div class="${P}-tab-pnl" id="${P}-tp-rules">
          <div class="${P}-row" style="justify-content:space-between!important;">
            <span id="${P}-lbl-custom" class="${P}-slbl">${t('custom_rules')}</span>
            <span id="${P}-open-rulemgr" class="${P}-rulemgr-btn">⚙️ ${t('rule_manager')}</span>
          </div>
          <div id="${P}-defbar" class="${P}-defbar"></div>
          <div id="${P}-rules-list"></div>
          <button id="${P}-add-rule" class="${P}-add-rule-btn">${t('add_rule')}</button>
        </div>
      </div>
      <div class="${P}-panel-foot">
        <div class="${P}-foot" id="${P}-count">${t('masked')(0)}</div>
        <div id="${P}-hint" class="${P}-hint">${t('hint')}</div>
      </div>
    `);
    applyTheme(cfg.theme);
    toggleEl=panelEl.querySelector(`#${P}-sw`);
    countEl=panelEl.querySelector(`#${P}-count`);
    ivalEl=panelEl.querySelector(`#${P}-ival`);
    isizeEl=panelEl.querySelector(`#${P}-isize`);

    panelEl.querySelector(`#${P}-close`).addEventListener('click',closePanel);

    panelEl.querySelector(`#${P}-theme-btn`).addEventListener('click',function(){
      cfg.theme=cfg.theme==='dark'?'light':'dark';
      this.textContent=cfg.theme==='dark'?'☀️':'🌙';
      this.title=cfg.theme==='dark'?t('theme_light'):t('theme_dark');
      applyTheme(cfg.theme);saveCfg();
    });

    const langBtn=panelEl.querySelector(`#${P}-lang-btn`);
    const langDrop=panelEl.querySelector(`#${P}-lang-drop`);
    langBtn.addEventListener('click',e=>{
      e.stopPropagation();
      langDrop.classList.toggle('open');
    });
    langDrop.addEventListener('click',e=>{
      const opt=e.target.closest(`.${P}-lang-opt`);
      if(!opt)return;
      langDrop.classList.remove('open');
      applyLanguage(opt.dataset.lv);
    });
    document.addEventListener('click',e=>{
      if(!e.target.closest(`#${P}-lang-drop`)&&!e.target.closest(`#${P}-lang-btn`)){
        langDrop?.classList.remove('open');
      }
    },{capture:false});

    const rvToggle=panelEl.querySelector(`#${P}-rv-toggle`);
    let rvDrop=document.getElementById(`${P}-rv-drop`);
    if(!rvDrop){
      rvDrop=document.createElement('div');
      rvDrop.id=`${P}-rv-drop`;
      rvDrop.className=`${P}-rv-drop`;
      document.body.appendChild(rvDrop);
      applyTheme(cfg.theme);
    }
    renderRvOptions();
    function positionRvDrop(){
      const r=rvToggle.getBoundingClientRect();
      const dropWidth=130,dropMaxHeight=220,margin=4;
      let left=r.right-dropWidth;
      if(left<margin)left=Math.max(margin,r.left);
      let top=r.bottom+margin;
      if(top+dropMaxHeight>window.innerHeight-margin) top=Math.max(margin,r.top-dropMaxHeight-margin);
      rvDrop.style.top=`${top}px`;
      rvDrop.style.left=`${left}px`;
    }
    rvToggle.addEventListener('click',e=>{
      e.stopPropagation();
      const opening=!rvDrop.classList.contains('open');
      if(opening)positionRvDrop();
      rvDrop.classList.toggle('open');
    });
    rvDrop.addEventListener('click',e=>{
      e.stopPropagation();
      const opt=e.target.closest(`.${P}-rv-opt`);
      if(!opt)return;
      onRedactVariantChange(opt.dataset.rv);
      rvDrop.classList.remove('open');
      renderRvOptions();
    });
    document.addEventListener('click',e=>{
      if(!e.target.closest(`#${P}-rv-drop`)&&!e.target.closest(`#${P}-rv-toggle`)){
        rvDrop?.classList.remove('open');
      }
    },{capture:false});
    window.addEventListener('scroll',()=>{if(rvDrop.classList.contains('open'))positionRvDrop();},{capture:true,passive:true});
    window.addEventListener('resize',()=>{if(rvDrop.classList.contains('open'))positionRvDrop();});

    toggleEl.addEventListener('click',onMasterToggle);
    panelEl.querySelectorAll(`.${P}-btn`).forEach(b=>b.addEventListener('click',()=>onStyleChange(b.dataset.s)));

    panelEl.querySelector(`#${P}-sl`).addEventListener('input',function(){
      cfg.intensity=+this.value;ivalEl.textContent=`${cfg.intensity}px`;
      document.documentElement.style.setProperty('--pm-r',`${cfg.intensity}px`);
      document.documentElement.style.setProperty('--pm-tile',`${cfg.intensity}px`);
      saveCfg();
    });
    panelEl.querySelector(`#${P}-sl-reset`).addEventListener('click',()=>{
      cfg.intensity=8;
      panelEl.querySelector(`#${P}-sl`).value=8;
      ivalEl.textContent='8px';
      document.documentElement.style.setProperty('--pm-r','8px');
      document.documentElement.style.setProperty('--pm-tile','8px');
      saveCfg();
    });

    panelEl.querySelector(`#${P}-szsl`).addEventListener('input',function(){
      cfg.iconSize=+this.value;isizeEl.textContent=`${cfg.iconSize}px`;onIconSizeChange();
    });
    panelEl.querySelector(`#${P}-szsl-reset`).addEventListener('click',()=>{
      cfg.iconSize=36;
      panelEl.querySelector(`#${P}-szsl`).value=36;
      isizeEl.textContent='36px';onIconSizeChange();
    });

    panelEl.querySelector(`#${P}-persist`).addEventListener('click',function(){
      cfg.persistent=!cfg.persistent;this.classList.toggle('on',cfg.persistent);saveCfg();
    });

    panelEl.querySelector(`#${P}-fabsite`).addEventListener('click',function(){
      const host=location.hostname;
      const on=!cfg.fabAllowlist.includes(host);
      cfg.fabAllowlist=on?[...cfg.fabAllowlist,host]:cfg.fabAllowlist.filter(h=>h!==host);
      this.classList.toggle('on',on);
      sessionFabOverride=null;
      applyFabHidden();saveCfg();
      const ta=panelEl.querySelector(`#${P}-fablist`);
      if(ta)ta.value=cfg.fabAllowlist.join('\n');
    });
    panelEl.querySelector(`#${P}-fablist`).addEventListener('change',function(){
      cfg.fabAllowlist=[...new Set(
        this.value.split('\n').map(s=>s.trim()).filter(Boolean)
      )];
      this.value=cfg.fabAllowlist.join('\n');
      sessionFabOverride=null;
      applyFabHidden();saveCfg();
      const sw=panelEl.querySelector(`#${P}-fabsite`);
      if(sw)sw.classList.toggle('on',cfg.fabAllowlist.includes(location.hostname));
    });

    panelEl.querySelector(`#${P}-open-rulemgr`).addEventListener('click',()=>{
      openRuleManager();
    });

    panelEl.querySelector(`#${P}-add-rule`).addEventListener('click',()=>{
      detectEditId=null;closePanel();enterDetectMode();
    });
    const rulesList=panelEl.querySelector(`#${P}-rules-list`);
    if(rulesList)rulesList.addEventListener('click',onRuleListClick);
    panelEl.querySelector(`#${P}-defbar`)?.addEventListener('click',e=>{
      if(e.target.closest(`#${P}-defbar-hl`)){setHighlightDefault(!cfg.highlightDefaultRules);return;}
      if(e.target.closest(`#${P}-defbar-mgr`))openRuleManager();
    });
    renderCustomRules();
    updateCount();
  }

  function isFabAllowedHere(){
    if(sessionFabOverride!==null)return sessionFabOverride;
    return cfg.fabAllowlist.includes(location.hostname);
  }

  function applyFabHidden(){
    if(!fabWrapEl)return;
    if(!isFabAllowedHere()){
      fabWrapEl.style.setProperty('display','none','important');
    } else {
      fabWrapEl.style.removeProperty('display');
    }
  }

  function syncFabShow(){
    if(!fabWrapEl)return;
    const shouldShow=!!(panelEl&&panelEl.classList.contains('open'))||fabSessionReveal;
    fabWrapEl.classList.toggle('show',shouldShow);
  }

  function applyLanguage(value){
    cfg.lang=value;saveCfg();
    if(panelEl){
      const langBtn=panelEl.querySelector(`#${P}-lang-btn`);
      const newLabel=value===''?'🌐':(LANG_OPTIONS.find(o=>o.value===value)?.label.slice(0,4)||'🌐');
      if(langBtn)langBtn.textContent=newLabel;
      panelEl.querySelectorAll(`.${P}-lang-opt`).forEach(o=>o.classList.toggle('active',o.dataset.lv===value));
      updatePanelLang();updateCount();
    }
    showToast(t('reload_hint'));
  }

  function updatePanelLang(){
    const q=id=>panelEl.querySelector(`#${P}-${id}`);
    const tabs=panelEl.querySelectorAll(`.${P}-tab`);
    if(tabs.length>=3){
      tabs[0].textContent=t('tab_masking');
      tabs[1].textContent=t('options');
      tabs[2].textContent=t('tab_rules');
    }
    q('lbl-enable').textContent=t('enable');
    q('desc-enable').textContent=t('desc_enable');
    q('lbl-style').textContent=t('style_lbl');
    [['btn-blur','blur'],['btn-redact','redact']].forEach(([id,key])=>{
      const lbl=q(id)?.querySelector(`.${P}-btn-lbl`);
      if(lbl)lbl.textContent=t(key);
    });
    q('lbl-intensity').textContent=t('intensity');
    const rvToggleEl=q('rv-toggle');if(rvToggleEl)rvToggleEl.title=t('redact_variant');
    renderRvOptions();
    renderOnboardBanner();
    q('lbl-persistent').textContent=`🔁 ${t('persistent')}`;
    q('desc-persistent').textContent=t('desc_persistent');
    q('lbl-fabhidden').textContent=`🔲 ${t('fab_allowlist')}`;
    q('desc-fabhidden').textContent=t('desc_fab_allowlist');
    q('lbl-fablist').textContent=t('fab_allowlist_mgr');
    const fablistEl=q('fablist');if(fablistEl)fablistEl.placeholder=t('fab_allowlist_ph');
    q('lbl-iconsize').textContent=t('icon_size');
    const lblDefEl=q('lbl-defrules');if(lblDefEl)lblDefEl.textContent=t('default_rules');
    const descDefEl=q('desc-defrules');if(descDefEl)descDefEl.textContent=t('desc_default_rules')(ALL_SEL.length);
    const lblHlEl=q('lbl-hldefault');if(lblHlEl)lblHlEl.textContent=`🟠 ${t('highlight_default')}`;
    const descHlEl=q('desc-hldefault');if(descHlEl)descHlEl.textContent=t('desc_highlight_default');
    q('lbl-custom').textContent=t('custom_rules');
    const addBtn=q('add-rule');if(addBtn)addBtn.textContent=t('add_rule');
    q('hint').textContent=t('hint');
    const closeEl=q('close');if(closeEl)closeEl.title=t('close');
    const themeBtn=q('theme-btn');
    if(themeBtn){themeBtn.textContent=cfg.theme==='dark'?'☀️':'🌙';themeBtn.title=cfg.theme==='dark'?t('theme_light'):t('theme_dark');}
    const langBtnEl=q('lang-btn');
    if(langBtnEl)langBtnEl.title=t('language');
    updateFabTitle();
    renderCustomRules();
    updateCount();
  }

  const ONBOARD_STEPS=['welcome','rules','next'];
  function renderOnboardBanner(){
    const el=panelEl?.querySelector(`#${P}-ob`);
    if(!el)return;
    if(cfg.onboarded){el.style.display='none';return;}
    const stepKey=ONBOARD_STEPS[onboardStep]||ONBOARD_STEPS[0];
    const isLast=onboardStep===ONBOARD_STEPS.length-1;
    el.style.display='flex';
    el.innerHTML=trustedHTML(`
      <div class="${P}-ob-step">${t('ob_step')(onboardStep+1)}</div>
      <div class="${P}-ob-title">${t(`ob_${stepKey}_title`)}</div>
      <div class="${P}-ob-body">${t(`ob_${stepKey}_body`)}</div>
      <div class="${P}-ob-actions">
        <button class="${P}-ob-btn skip" id="${P}-ob-skip">${t('ob_skip')}</button>
        <button class="${P}-ob-btn next" id="${P}-ob-next">${isLast?t('ob_gotit'):t('ob_next')}</button>
      </div>
    `);
    el.querySelector(`#${P}-ob-skip`).addEventListener('click',onboardSkip);
    el.querySelector(`#${P}-ob-next`).addEventListener('click',onboardAdvance);
  }
  function onboardAdvance(){
    if(onboardStep>=ONBOARD_STEPS.length-1){
      cfg.onboarded=true;saveCfg();
      panelEl?.querySelector(`.${P}-tab[data-tab="rules"]`)?.click();
      renderOnboardBanner();
      return;
    }
    onboardStep++;
    renderOnboardBanner();
  }
  function onboardSkip(){
    cfg.onboarded=true;onboardStep=0;saveCfg();
    renderOnboardBanner();
  }

  function buildRuleItemHtml(rule,showEdit=true){
    const offsiteBadge=showEdit?'':
      `<span class="${P}-rule-badge" title="${escapeHtmlAttr(t('rule_edit_elsewhere')(rule.site||''))}">${t('rule_offsite')}</span>`;
    return `
      <div class="${P}-sw${rule.enabled?' on':''}" data-rid="${rule.id}" style="width:36px;height:20px;flex-shrink:0;margin-top:2px;"></div>
      <div class="${P}-rule-main">
        <span class="${P}-rule-name" title="${escapeHtmlAttr(rule.selector)}">${escapeHtmlText(rule.name||rule.selector)}</span>
        ${offsiteBadge}
      </div>
      <div class="${P}-rule-icons">
        <span class="${P}-rule-icon" data-action="edit" data-rid="${rule.id}" title="${showEdit?t('rule_edit'):t('rule_edit_elsewhere')(rule.site||'')}">✏️</span>
        <span class="${P}-rule-icon" data-action="del" data-rid="${rule.id}" title="${t('rule_delete')}">✕</span>
      </div>
    `;
  }

  function fixSwSizing(item){
    item.querySelector(`.${P}-sw`)?.classList.add(`${P}-sw-sm`);
  }

  function countDefaultMatches(){
    return document.querySelectorAll(`.${ACTIVE}[data-pm-src="default"]`).length;
  }

  function setHighlightDefault(on){
    cfg.highlightDefaultRules=!!on;
    applyHighlightDefault();saveCfg();
    document.getElementById(`${P}-sw-hldefault`)?.classList.toggle('on',cfg.highlightDefaultRules);
    document.getElementById(`${P}-defbar-hl`)?.classList.toggle('on',cfg.highlightDefaultRules);
  }

  function renderDefaultRulesBar(){
    const bar=panelEl?.querySelector(`#${P}-defbar`);
    if(!bar)return;
    const ruleOn=cfg.defaultRulesEnabled;
    const activeSelCount=ALL_SEL.length-cfg.disabledDefaultSelectors.length;
    let state,txt,ico;
    if(!ruleOn){state='off';txt=t('defbar_off');ico='⏸️';}
    else if(activeSelCount<=0){state='off';txt=t('defbar_none');ico='⏸️';}
    else{
      const n=countDefaultMatches();
      if(n>0){state='';txt=t('defbar_on')(n);ico='🛡️';}
      else{state='idle';txt=t('defbar_idle');ico='🛡️';}
    }
    bar.className=`${P}-defbar${state?' '+state:''}`;
    const hlBtn=state==='off'?'':
      `<span id="${P}-defbar-hl" class="${P}-defbar-hl${cfg.highlightDefaultRules?' on':''}" title="${escapeHtmlAttr(t('defbar_hl_tip'))}">🟠</span>`;
    bar.innerHTML=trustedHTML(`
      <span class="${P}-defbar-ico">${ico}</span>
      <span class="${P}-defbar-txt" title="${escapeHtmlAttr(t('defbar_tip'))}">${escapeHtmlText(txt)}</span>
      ${hlBtn}
      <span id="${P}-defbar-mgr" class="${P}-defbar-mgr">${escapeHtmlText(t('defbar_manage'))} →</span>
    `);
  }

  function renderCustomRules(){
    renderDefaultRulesBar();
    const list=panelEl?.querySelector(`#${P}-rules-list`);
    if(!list)return;
    const host=location.hostname;
    const rules=(cfg.customRules||[]).filter(r=>!r.site||r.site===host);
    if(!rules.length){
      list.innerHTML=trustedHTML(`<div class="${P}-rule-no">${t('no_rules')}<span class="${P}-rule-no-hint">${escapeHtmlText(t('no_rules_hint')(ALL_SEL.length))}</span></div>`);return;
    }
    list.textContent='';
    rules.forEach(rule=>{
      const item=document.createElement('div');
      item.className=`${P}-rule-item`;
      item.innerHTML=trustedHTML(buildRuleItemHtml(rule));
      fixSwSizing(item);
      list.appendChild(item);
    });
  }

  function onRuleListClick(e){
    const sw=e.target.closest(`.${P}-sw[data-rid]`);
    if(sw){toggleRule(sw.dataset.rid);return;}
    const icon=e.target.closest(`[data-action][data-rid]`);
    if(!icon)return;
    if(icon.dataset.action==='del'){
      showConfirmDialog(t('confirm_delete'),()=>deleteRule(icon.dataset.rid));
    } else if(icon.dataset.action==='edit'){
      detectEditId=icon.dataset.rid;closePanel();enterDetectMode();
    }
  }

  function buildRuleManager(){
    let backdrop=document.getElementById(`${P}-rulemgr-backdrop`);
    if(!backdrop){
      backdrop=document.createElement('div');
      backdrop.id=`${P}-rulemgr-backdrop`;
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click',closeRuleManager);
    }
    let mgr=document.getElementById(`${P}-rulemgr`);
    if(mgr)return mgr;
    mgr=document.createElement('div');
    mgr.id=`${P}-rulemgr`;
    document.body.appendChild(mgr);
    mgr.innerHTML=trustedHTML(`
      <div class="${P}-rm-hdr">
        <span class="${P}-rm-title">🗂️ ${t('rule_manager')}</span>
        <span id="${P}-rulemgr-close" class="${P}-close" title="${t('close')}">
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 1l8 8M9 1l-8 8" stroke-width="1.8" stroke-linecap="round"/></svg>
        </span>
      </div>
      <div class="${P}-rm-body" id="${P}-rulemgr-body"></div>
    `);
    applyTheme(cfg.theme);
    mgr.querySelector(`#${P}-rulemgr-close`).addEventListener('click',closeRuleManager);
    mgr.addEventListener('click',onRuleMgrClick);
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&mgr.classList.contains('open'))closeRuleManager();
    });
    return mgr;
  }

  function openRuleManager(){
    buildRuleManager();
    document.getElementById(`${P}-rulemgr-backdrop`).classList.add('open');
    document.getElementById(`${P}-rulemgr`).classList.add('open');
    renderRuleManager();
  }

  function closeRuleManager(){
    document.getElementById(`${P}-rulemgr`)?.classList.remove('open');
    document.getElementById(`${P}-rulemgr-backdrop`)?.classList.remove('open');
  }

  function renderRuleManager(){
    const body=document.getElementById(`${P}-rulemgr-body`);
    if(!body)return;
    const wasDefListOpen=body.querySelector(`.${P}-def-list`)?.open??false;
    const host=location.hostname;
    const rules=cfg.customRules||[];

    const groups=new Map();
    rules.forEach(rule=>{
      const key=rule.site||'*';
      if(!groups.has(key))groups.set(key,[]);
      groups.get(key).push(rule);
    });
    const sortedKeys=[...groups.keys()].sort((a,b)=>{
      if(a===host)return -1;if(b===host)return 1;
      return a.localeCompare(b);
    });

    const buildSelRow=s=>{
      const isOff=cfg.disabledDefaultSelectors.includes(s);
      return `<div class="${P}-def-sel${isOff?' off':''}">
        <span class="${P}-def-sel-text">${escapeHtmlText(s)}</span>
        <span class="${P}-def-sel-btn" data-defsel="${escapeHtmlAttr(s)}" title="${isOff?t('def_sel_restore'):t('def_sel_disable')}">${isOff?'↺':'✕'}</span>
      </div>`;
    };
    const disabledCount=cfg.disabledDefaultSelectors.length;
    const groupState=arr=>{
      const off=arr.filter(s=>cfg.disabledDefaultSelectors.includes(s)).length;
      return off===0?'on':(off===arr.length?'off':'mixed');
    };
    const buildGroupHdr=(key,label,arr)=>{
      const st=groupState(arr);
      return `<div class="${P}-def-group-hdr">
        <span class="${P}-def-group-name">${escapeHtmlText(label)} <span class="${P}-def-group-count">${t('def_list_count')(arr.length)}</span></span>
        <div class="${P}-sw ${P}-sw-sm ${P}-def-gsw${st==='on'?' on':''}${st==='mixed'?' mixed':''}" data-defgroup="${key}" title="${st==='on'?t('def_group_disable'):t('def_group_enable')}"></div>
      </div>`;
    };
    const allState=groupState(ALL_SEL);
    const defListHtml=`
      <details class="${P}-def-list">
        <summary class="${P}-def-summary">
          <span><i class="${P}-def-chev"></i><span>${t('def_list_toggle')(ALL_SEL.length)}</span></span>
          <span class="${P}-def-summary-right">
            ${disabledCount?`<span class="${P}-def-group-count">${t('def_list_disabled_count')(disabledCount)}</span>`:''}
            <div class="${P}-sw ${P}-sw-sm ${P}-def-gsw${allState==='on'?' on':''}${allState==='mixed'?' mixed':''}" data-defgroup="all" title="${allState==='on'?t('def_group_disable_all'):t('def_group_enable_all')}"></div>
          </span>
        </summary>
        ${disabledCount?`<button class="${P}-def-reset" id="${P}-def-reset-btn">↺ ${t('def_reset_all')}</button>`:''}
        ${buildGroupHdr('avatar',t('def_list_avatar'),AVATAR_SEL)}
        ${AVATAR_SEL.map(buildSelRow).join('')}
        ${buildGroupHdr('handle',t('def_list_handle'),HANDLE_SEL)}
        ${HANDLE_SEL.map(buildSelRow).join('')}
        ${buildGroupHdr('id',t('def_list_id'),ID_SEL)}
        ${ID_SEL.map(buildSelRow).join('')}
      </details>
    `;
    const togglesHtml=`
      <div class="${P}-rm-toggles">
        <div class="${P}-row">
          <span id="${P}-lbl-defrules" class="${P}-rlbl">${t('default_rules')}</span>
          <div id="${P}-sw-defrules" class="${P}-sw ${cfg.defaultRulesEnabled?'on':''}"></div>
        </div>
        <div id="${P}-desc-defrules" class="${P}-desc">${t('desc_default_rules')(ALL_SEL.length)}</div>
        <div class="${P}-row" style="margin-top:10px!important;">
          <span id="${P}-lbl-hldefault" class="${P}-rlbl">🟠 ${t('highlight_default')}</span>
          <div id="${P}-sw-hldefault" class="${P}-sw ${cfg.highlightDefaultRules?'on':''}"></div>
        </div>
        <div id="${P}-desc-hldefault" class="${P}-desc">${t('desc_highlight_default')}</div>
        ${defListHtml}
        <hr class="${P}-hr">
      </div>
    `;

    if(!rules.length){
      body.innerHTML=trustedHTML(togglesHtml+`<div class="${P}-rm-empty">${t('no_rules')}</div>`);
    } else {
      const groupsHtml=sortedKeys.map(site=>{
        const groupRules=groups.get(site);
        const isWildcard=site==='*';
        const faviconSrc=isWildcard?'':escapeUrl(`https://www.google.com/s2/favicons?sz=32&domain=${encodeURIComponent(site)}`);
        const itemsHtml=groupRules.map(rule=>{
          const canEdit=!rule.site||rule.site===host;
          return `<div class="${P}-rule-item ${P}-rule-compact">${buildRuleItemHtml(rule,canEdit)}</div>`;
        }).join('');
        return `
          <div class="${P}-rm-group">
            <div class="${P}-rm-group-hdr">
              ${isWildcard?'🌐':`<img class="${P}-rm-favicon" src="${faviconSrc}" alt="" loading="lazy">`}
              <span class="${P}-rm-domain">${escapeHtmlText(isWildcard?t('rm_all_sites'):site)}</span>
              <span class="${P}-rm-count">${groupRules.length}</span>
            </div>
            ${itemsHtml}
          </div>
        `;
      }).join('');
      body.innerHTML=trustedHTML(togglesHtml+groupsHtml);
      body.querySelectorAll(`.${P}-rule-item`).forEach(fixSwSizing);
    }
    if(wasDefListOpen){
      const defListEl=body.querySelector(`.${P}-def-list`);
      if(defListEl)defListEl.open=true;
    }

    document.getElementById(`${P}-sw-defrules`)?.addEventListener('click',function(){
      cfg.defaultRulesEnabled=!cfg.defaultRulesEnabled;
      this.classList.toggle('on',cfg.defaultRulesEnabled);
      saveCfg();
      if(cfg.defaultRulesEnabled){if(enabled)scanAndTag();}
      else{clearDefaultRuleEffects();}
      renderDefaultRulesBar();
    });
    document.getElementById(`${P}-sw-hldefault`)?.addEventListener('click',function(){
      setHighlightDefault(!cfg.highlightDefaultRules);
    });
  }

  function onRuleMgrClick(e){
    const sw=e.target.closest(`.${P}-sw[data-rid]`);
    if(sw){toggleRule(sw.dataset.rid);renderRuleManager();return;}
    const gsw=e.target.closest(`[data-defgroup]`);
    if(gsw){
      e.preventDefault();
      const key=gsw.dataset.defgroup;
      const arr=key==='avatar'?AVATAR_SEL:key==='handle'?HANDLE_SEL:key==='id'?ID_SEL:ALL_SEL;
      const set=new Set(cfg.disabledDefaultSelectors);
      const allOn=arr.every(s=>!set.has(s));
      if(allOn)arr.forEach(s=>set.add(s));
      else arr.forEach(s=>set.delete(s));
      cfg.disabledDefaultSelectors=[...set];
      saveCfg();invalidateSelCache();
      clearDefaultRuleEffects();if(enabled&&cfg.defaultRulesEnabled)scanAndTag();
      renderDefaultRulesBar();
      renderRuleManager();
      return;
    }
    const defBtn=e.target.closest(`[data-defsel]`);
    if(defBtn){
      const sel=defBtn.dataset.defsel;
      const idx=cfg.disabledDefaultSelectors.indexOf(sel);
      if(idx===-1)cfg.disabledDefaultSelectors.push(sel);
      else cfg.disabledDefaultSelectors.splice(idx,1);
      saveCfg();invalidateSelCache();
      clearDefaultRuleEffects();if(enabled&&cfg.defaultRulesEnabled)scanAndTag();
      renderDefaultRulesBar();
      renderRuleManager();
      return;
    }
    if(e.target.closest(`#${P}-def-reset-btn`)){
      cfg.disabledDefaultSelectors=[];
      saveCfg();invalidateSelCache();
      clearDefaultRuleEffects();if(enabled&&cfg.defaultRulesEnabled)scanAndTag();
      renderDefaultRulesBar();
      renderRuleManager();
      return;
    }
    const icon=e.target.closest(`[data-action][data-rid]`);
    if(!icon)return;
    if(icon.dataset.action==='del'){
      showConfirmDialog(t('confirm_delete'),()=>{deleteRule(icon.dataset.rid);renderRuleManager();});
    } else if(icon.dataset.action==='edit'){
      const rule=cfg.customRules.find(r=>r.id===icon.dataset.rid);
      if(!rule)return;
      const canEdit=!rule.site||rule.site===location.hostname;
      if(canEdit){
        detectEditId=icon.dataset.rid;closeRuleManager();closePanel();enterDetectMode();
      } else {
        detectEditId=icon.dataset.rid;
        showRuleDialog(rule.selector,{readonly:true,site:rule.site,onSaved:renderRuleManager});
      }
    }
  }

  function openPanel(){
    setPanelPos();
    panelEl.classList.add('open');
    renderDefaultRulesBar();
    syncFabShow();
    renderOnboardBanner();
  }
  function closePanel(){
    panelEl.classList.remove('open');
    syncFabShow();
  }

  function setPanelPos(){
    if(!panelEl)return;
    const margin=16;
    const pw=Math.min(420,window.innerWidth-32);
    const defaultX=window.innerWidth-pw-margin;
    const defaultY=80;
    const x=cfg.panelX!=null?cfg.panelX:defaultX;
    const y=cfg.panelY!=null?cfg.panelY:defaultY;
    const cx=Math.max(margin,Math.min(window.innerWidth-pw-margin,x));
    const cy=Math.max(margin,Math.min(window.innerHeight-80,y));
    panelEl.style.setProperty('left',cx+'px','important');
    panelEl.style.setProperty('top',cy+'px','important');
  }

  function makeDraggable(panel){
    const handle=panel.querySelector(`.${P}-drag-handle`);
    if(!handle)return;
    let dragging=false,ox=0,oy=0,pl=0,pt=0;

    handle.addEventListener('mousedown',e=>{
      if(e.button!==0)return;
      dragging=true;
      ox=e.clientX;oy=e.clientY;
      pl=parseInt(panel.style.left)||0;
      pt=parseInt(panel.style.top)||0;
      handle.classList.add('dragging');
      e.preventDefault();
    });

    handle.addEventListener('dblclick',e=>{
      e.preventDefault();
      cfg.panelX=null;cfg.panelY=null;saveCfg();
      setPanelPos();
    });

    document.addEventListener('mousemove',e=>{
      if(!dragging)return;
      const pw=panel.offsetWidth,ph=panel.offsetHeight,margin=8;
      const nx=Math.max(margin,Math.min(window.innerWidth-pw-margin,pl+(e.clientX-ox)));
      const ny=Math.max(margin,Math.min(window.innerHeight-ph-margin,pt+(e.clientY-oy)));
      panel.style.setProperty('left',nx+'px','important');
      panel.style.setProperty('top',ny+'px','important');
    });

    document.addEventListener('mouseup',()=>{
      if(!dragging)return;
      dragging=false;
      handle.classList.remove('dragging');
      cfg.panelX=parseInt(panel.style.left)||0;
      cfg.panelY=parseInt(panel.style.top)||0;
      saveCfg();
    });
  }
  function enterDetectMode(){
    detectMode=true;
    const bar=document.createElement('div');
    bar.id=`${P}-detect-bar`;
    bar.innerHTML=trustedHTML(`<span>🎯 ${t('detecting')}</span><button id="${P}-detect-cancel">${t('cancel_detect')}</button>`);
    document.body.appendChild(bar);
    bar.querySelector(`#${P}-detect-cancel`).addEventListener('click',()=>exitDetectMode());
    document.addEventListener('mouseover',onDetectOver,true);
    document.addEventListener('click',onDetectClick,true);
  }

  function exitDetectMode(){
    detectMode=false;
    if(detectHoverEl){detectHoverEl.classList.remove(`${P}-detect-hl`);detectHoverEl=null;}
    document.getElementById(`${P}-detect-bar`)?.remove();
    document.removeEventListener('mouseover',onDetectOver,true);
    document.removeEventListener('click',onDetectClick,true);
    detectEditId=null;
  }

  function onDetectOver(e){
    const el=e.target;
    if(el.closest(GUARD)) return;
    if(detectHoverEl&&detectHoverEl!==el) detectHoverEl.classList.remove(`${P}-detect-hl`);
    el.classList.add(`${P}-detect-hl`);
    detectHoverEl=el;
  }

  function onDetectClick(e){
    const el=e.target;
    if(el.closest(GUARD)) return;
    e.preventDefault();e.stopPropagation();
    if(detectHoverEl) detectHoverEl.classList.remove(`${P}-detect-hl`);
    const selector=generateSelector(el);
    exitDetectMode();
    showRuleDialog(selector);
  }

  function generateSelector(el){
    if(el.dataset.testid) return `[data-testid="${el.dataset.testid}"]`;
    if(el.id&&!/^[0-9]/.test(el.id)&&!el.id.includes(':')&&el.id.length<60){
      try{return `#${CSS.escape(el.id)}`;}catch(_){}
    }
    const al=el.getAttribute('aria-label');
    if(al&&al.length<50){
      try{return `${el.tagName.toLowerCase()}[aria-label="${al.replace(/"/g,'\\"')}"]`;}catch(_){}
    }
    const stable=[...el.classList].filter(c=>
      !/^r-[a-z0-9]+$/.test(c)&&!/^css-/.test(c)&&c.length>2&&c.length<40
    );
    if(stable.length&&stable.length<=3){
      try{return `${el.tagName.toLowerCase()}.${stable.map(c=>CSS.escape(c)).join('.')}`;}catch(_){}
    }
    return buildPathSelector(el,0);
  }

  function buildPathSelector(el,depth){
    if(!el||el===document.body||depth>4) return el?.tagName?.toLowerCase()||'*';
    const tag=el.tagName.toLowerCase();
    const parent=el.parentElement;
    if(!parent) return tag;
    const siblings=[...parent.children].filter(c=>c.tagName===el.tagName);
    const nth=siblings.indexOf(el)+1;
    const self=siblings.length>1?`${tag}:nth-of-type(${nth})`:tag;
    try{if(document.querySelectorAll(self).length<=5)return self;}catch(_){}
    return `${buildPathSelector(parent,depth+1)} > ${self}`;
  }

  function showRuleDialog(selector,opts={}){
    const{readonly=false,site=location.hostname,onSaved=null}=opts;
    let backdrop=document.getElementById(`${P}-rule-dialog-backdrop`);
    if(!backdrop){
      backdrop=document.createElement('div');
      backdrop.id=`${P}-rule-dialog-backdrop`;
      document.body.appendChild(backdrop);
    }
    backdrop.classList.add('open');

    let dlg=document.getElementById(`${P}-rule-dialog`);
    const existingRule=detectEditId?cfg.customRules.find(r=>r.id===detectEditId):null;
    const isEdit=!!existingRule;

    if(!dlg){
      dlg=document.createElement('div');
      dlg.id=`${P}-rule-dialog`;
      document.body.appendChild(dlg);
    }
    const selRowHtml=readonly
      ?`<div class="${P}-rd-sel readonly" title="${escapeHtmlAttr(t('rule_edit_elsewhere')(site))}">${escapeHtmlText(selector)}</div>
         <div class="${P}-rule-badge" style="margin-top:4px;">${t('rule_offsite')} · ${escapeHtmlText(t('rule_edit_elsewhere')(site))}</div>`
      :`<div class="${P}-rd-sel">${escapeHtmlText(selector)}</div>`;
    dlg.innerHTML=trustedHTML(`
      <div class="${P}-rd-title">${isEdit?'✏️ '+t('rule_edit'):'🎯 '+t('custom_rules')}</div>
      <div class="${P}-rd-lbl">${t('rule_name_lbl')}</div>
      <input id="${P}-rd-name" class="${P}-rd-input" placeholder="${t('rule_name_ph')}"
             value="${isEdit?escapeHtmlAttr(existingRule.name||''):''}">
      <div class="${P}-rd-lbl">${t('css_selector')}</div>
      ${selRowHtml}
      <div class="${P}-rd-lbl">${t('site_lbl')}: <strong style="color:#9090c8">${escapeHtmlText(site)}</strong></div>
      <div class="${P}-rd-actions">
        <button class="${P}-rd-btn cancel" id="${P}-rd-cancel">${t('cancel_detect')}</button>
        <button class="${P}-rd-btn save" id="${P}-rd-save">${t('save_rule')}</button>
      </div>
    `);
    dlg.classList.add('open');

    const nameInput=dlg.querySelector(`#${P}-rd-name`);
    nameInput.focus();
    nameInput.select();

    dlg.querySelector(`#${P}-rd-cancel`).addEventListener('click',()=>closeRuleDialog());
    dlg.querySelector(`#${P}-rd-save`).addEventListener('click',()=>{
      const name=nameInput.value.trim()||selector.slice(0,30);
      if(isEdit){
        if(!readonly)existingRule.selector=selector;
        existingRule.name=name;saveCfg();
        removeCustomEffects();scanCustomRules();
      } else {
        saveRule(name,selector);
      }
      closeRuleDialog();
      if(onSaved){onSaved();}else{openPanel();renderCustomRules();}
    });
    nameInput.addEventListener('keydown',e=>{if(e.key==='Enter'){dlg.querySelector(`#${P}-rd-save`).click();}});
  }

  function closeRuleDialog(){
    document.getElementById(`${P}-rule-dialog`)?.classList.remove('open');
    document.getElementById(`${P}-rule-dialog-backdrop`)?.classList.remove('open');
    detectEditId=null;
  }

  function showConfirmDialog(message,onConfirm){
    let backdrop=document.getElementById(`${P}-confirm-backdrop`);
    if(!backdrop){
      backdrop=document.createElement('div');
      backdrop.id=`${P}-confirm-backdrop`;
      document.body.appendChild(backdrop);
    }
    let dlg=document.getElementById(`${P}-confirm-dialog`);
    if(!dlg){
      dlg=document.createElement('div');
      dlg.id=`${P}-confirm-dialog`;
      document.body.appendChild(dlg);
    }
    dlg.innerHTML=trustedHTML(`
      <div class="${P}-cf-msg">${escapeHtmlText(message)}</div>
      <div class="${P}-cf-actions">
        <button class="${P}-rd-btn cancel" id="${P}-cf-cancel">${t('cancel_detect')}</button>
        <button class="${P}-rd-btn save" id="${P}-cf-ok">${t('rule_delete')}</button>
      </div>
    `);
    backdrop.classList.add('open');dlg.classList.add('open');
    const close=()=>{backdrop.classList.remove('open');dlg.classList.remove('open');};
    dlg.querySelector(`#${P}-cf-cancel`).addEventListener('click',close,{once:true});
    dlg.querySelector(`#${P}-cf-ok`).addEventListener('click',()=>{close();onConfirm();},{once:true});
    backdrop.addEventListener('click',close,{once:true});
  }

  let toastTimer=null;
  function showToast(message,duration=4000){
    let toast=document.getElementById(`${P}-toast`);
    if(!toast){
      toast=document.createElement('div');
      toast.id=`${P}-toast`;
      document.body.appendChild(toast);
    }
    toast.textContent=message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>{toast.classList.remove('show');},duration);
  }

  function showLanguageDialog(){
    let backdrop=document.getElementById(`${P}-lang-dialog-backdrop`);
    if(!backdrop){
      backdrop=document.createElement('div');
      backdrop.id=`${P}-lang-dialog-backdrop`;
      document.body.appendChild(backdrop);
    }
    let dlg=document.getElementById(`${P}-lang-dialog`);
    if(!dlg){
      dlg=document.createElement('div');
      dlg.id=`${P}-lang-dialog`;
      document.body.appendChild(dlg);
    }
    const rowsHtml=`<div class="${P}-lang-opt${cfg.lang===''?' active':''}" data-lv="">🌐 Auto</div>`+
      LANG_OPTIONS.map(o=>`<div class="${P}-lang-opt${cfg.lang===o.value?' active':''}" data-lv="${o.value}">${o.label}</div>`).join('');
    dlg.innerHTML=trustedHTML(`
      <div class="${P}-rd-title">🌐 ${t('language')}</div>
      <div id="${P}-lang-dialog-list">${rowsHtml}</div>
    `);
    const close=()=>{
      backdrop.classList.remove('open');dlg.classList.remove('open');
      document.removeEventListener('keydown',onEsc);
    };
    const onEsc=e=>{if(e.key==='Escape')close();};
    dlg.querySelector(`#${P}-lang-dialog-list`).addEventListener('click',e=>{
      const opt=e.target.closest(`.${P}-lang-opt`);
      if(!opt)return;
      close();
      applyLanguage(opt.dataset.lv);
    },{once:false});
    backdrop.classList.add('open');dlg.classList.add('open');
    backdrop.addEventListener('click',close,{once:true});
    document.addEventListener('keydown',onEsc);
  }

  function saveRule(name,selector){
    const id=`rule_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
    cfg.customRules.push({id,name,selector,site:location.hostname,enabled:true});
    saveCfg();syncObserver();scanCustomRules();renderCustomRules();
  }

  function deleteRule(id){
    document.querySelectorAll(`[data-pm-rid="${id}"]`).forEach(el=>{
      el.removeAttribute('data-pm-rid');
      const remaining=(el.dataset.pmRids||'').split(',').filter(x=>x&&x!==id);
      if(remaining.length){
        el.setAttribute('data-pm-rids',remaining.join(','));
      } else {
        el.classList.remove(`${P}-custom-active`,`${P}-blur`,`${P}-redact`,`${P}-pixelate-text`);
        if(el._pmSh){el._pmSh.remove();el.classList.remove(`${P}-img-hidden`);delete el._pmSh;}
        if(el._pmCv){el._pmCv.remove();el.style.display='';delete el._pmCv;delete el._pmDone;}
      }
    });
    cfg.customRules=cfg.customRules.filter(r=>r.id!==id);
    saveCfg();syncObserver();renderCustomRules();
  }

  function toggleRule(id){
    const rule=cfg.customRules.find(r=>r.id===id);
    if(!rule)return;
    rule.enabled=!rule.enabled;
    saveCfg();
    const sw=panelEl?.querySelector(`.${P}-sw[data-rid="${id}"]`);
    if(sw)sw.classList.toggle('on',rule.enabled);
    if(rule.enabled){syncObserver();scanCustomRules();}
    else{
      document.querySelectorAll(`.${P}-custom-active`).forEach(el=>{
        if((el.dataset.pmRids||'').includes(id)){
          const others=(el.dataset.pmRids||'').split(',').filter(x=>x&&x!==id);
          el.dataset.pmRids=others.join(',');
          if(!others.length){
            el.classList.remove(`${P}-custom-active`,`${P}-blur`,`${P}-redact`,`${P}-pixelate-text`);
            if(el._pmSh){el._pmSh.remove();el.classList.remove(`${P}-img-hidden`);delete el._pmSh;}
            if(el._pmCv){el._pmCv.remove();el.style.display='';delete el._pmCv;delete el._pmDone;}
          }
        }
      });
      syncObserver();
    }
  }

  function customRulesActive(){
    const host=location.hostname;
    return (cfg.customRules||[]).some(r=>r.enabled&&(!r.site||r.site===host));
  }

  function scanCustomRules(root){
    const host=location.hostname;
    const active=(cfg.customRules||[]).filter(r=>r.enabled&&(!r.site||r.site===host));
    if(!active.length)return;
    const isDoc=!root||root===document;
    const base=isDoc?document:root;
    active.forEach(rule=>{
      try{
        if(!isDoc&&base.matches?.(rule.selector)) applyCustom(base,rule);
        base.querySelectorAll(rule.selector).forEach(el=>applyCustom(el,rule));
      }catch(_){}
    });
  }

  function applyCustom(el,rule){
    if(!el||el.dataset.pmSkip)return;
    if(el.closest?.(GUARD))return;
    const ids=(el.dataset.pmRids||'').split(',').filter(Boolean);
    if(ids.includes(rule.id))return;
    ids.push(rule.id);
    el.dataset.pmRids=ids.join(',');
    if(!el.classList.contains(`${P}-custom-active`)){
      el.classList.remove(`${P}-blur`,`${P}-redact`,`${P}-pixelate-text`);
      el.classList.add(`${P}-custom-active`);
      const isImg=el.tagName==='IMG';
      switch(cfg.style){
        case 'blur': el.classList.add(`${P}-blur`);break;
        case 'redact':
          if(isImg){redactImg(el);}
          else{el.classList.add(`${P}-redact`);applyRedactVariant(el);}
          break;
        default:el.classList.add(`${P}-blur`);break;
      }
    }
  }

  function removeCustomEffects(){
    document.querySelectorAll(`.${P}-custom-active`).forEach(el=>{
      el.classList.remove(`${P}-custom-active`,`${P}-blur`,`${P}-redact`,`${P}-pixelate-text`);
      delete el.dataset.pmRids;
      if(el._pmSh){el._pmSh.remove();el.classList.remove(`${P}-img-hidden`);delete el._pmSh;}
      if(el._pmCv){el._pmCv.remove();el.style.display='';delete el._pmCv;delete el._pmDone;}
    });
  }

  function onMasterToggle(){
    enabled=!enabled;
    if(toggleEl)toggleEl.classList.toggle('on',enabled);
    const fab=document.getElementById(`${P}-fab`);
    if(fab)fab.classList.toggle(`${P}-on`,enabled);
    if(enabled){
      scanAndTag();
      if(customRulesActive())scanCustomRules();
    } else {
      removeMosaic();
      removeCustomEffects();
    }
    syncObserver();
    if(cfg.persistent!==enabled){
      cfg.persistent=enabled;
      const persistSw=panelEl?.querySelector(`#${P}-persist`);
      if(persistSw)persistSw.classList.toggle('on',cfg.persistent);
    }
    saveCfg();
    if(!cfg.onboarded)openPanel();
  }
  function onStyleChange(s){
    cfg.style=s;
    panelEl.querySelectorAll(`.${P}-btn`).forEach(b=>b.classList.toggle('on',b.dataset.s===s));
    updateIntensityUi();
    if(enabled){removeMosaic();scanAndTag();}
    if(customRulesActive()){removeCustomEffects();scanCustomRules();}
    saveCfg();
  }

  function onRedactVariantChange(variant){
    cfg.redactVariant=variant;
    document.querySelectorAll(`.${P}-redact:not(img)`).forEach(applyRedactVariant);
    updateIntensityUi();
    saveCfg();
  }

  const RV_OPTIONS=['solid','mosaic','checker','noise'];
  function renderRvOptions(){
    const drop=document.getElementById(`${P}-rv-drop`);
    if(!drop)return;
    drop.innerHTML=trustedHTML(RV_OPTIONS.map(v=>
      `<div class="${P}-rv-opt${cfg.redactVariant===v?' active':''}" data-rv="${v}">${t('rv_'+v)}</div>`
    ).join(''));
  }

  function onIconSizeChange(){
    const fab=document.getElementById(`${P}-fab`);
    if(fab){fab.innerHTML=trustedHTML(fabIconSVG(cfg.iconSize));fab.style.cssText=`width:${cfg.iconSize+14}px;height:${cfg.iconSize+14}px;`;}
    if(fabWrapEl)setFabWrapPadding(fabWrapEl,cfg.iconSize);
    saveCfg();
  }

  function updateIntensityUi(){
    const sl=panelEl?.querySelector(`#${P}-sl`);
    if(!sl)return;
    const redactTileable=cfg.style==='redact'&&(cfg.redactVariant==='mosaic'||cfg.redactVariant==='checker');
    sl.disabled=(cfg.style==='redact'&&!redactTileable);
  }

  const ACTIVE=`${P}-active`;

  function applyRedactVariant(el){
    if(cfg.redactVariant&&cfg.redactVariant!=='solid')el.dataset.pmRv=cfg.redactVariant;
    else delete el.dataset.pmRv;
  }

  function applyTo(el,src){
    if(!el||el.dataset.pmSkip)return;
    if(el.closest?.(GUARD))return;
    el.classList.remove(`${P}-blur`,`${P}-redact`,`${P}-pixelate-text`);
    el.classList.add(ACTIVE);
    if(src==='default')el.dataset.pmSrc='default';else delete el.dataset.pmSrc;
    switch(cfg.style){
      case 'blur':el.classList.add(`${P}-blur`);break;
      case 'redact':
        if(el.tagName==='IMG'){redactImg(el,src);}
        else{el.classList.add(`${P}-redact`);applyRedactVariant(el);}
        break;
      default:el.classList.add(`${P}-blur`);break;
    }
  }

  function clearDefaultRuleEffects(){
    document.querySelectorAll(`.${ACTIVE}[data-pm-src="default"]`).forEach(el=>{
      el.classList.remove(ACTIVE,`${P}-blur`,`${P}-redact`,`${P}-pixelate-text`);
      delete el.dataset.pmSrc;
      if(el._pmSh){el._pmSh.remove();el.classList.remove(`${P}-img-hidden`);delete el._pmSh;}
      if(el._pmCv){el._pmCv.remove();el.style.display='';delete el._pmCv;delete el._pmDone;}
    });
    updateCount(document.querySelectorAll(`.${ACTIVE}`).length);
  }

  function redactImg(img,src){
    if(img._pmSh)return;
    const inject=()=>{
      const w=img.offsetWidth||img.naturalWidth||48;
      const h=img.offsetHeight||img.naturalHeight||48;
      const br=(h>0&&w/h<1.4)?'50%':'8px';
      const div=document.createElement('div');
      div.className=`${P}-sk-overlay`;
      if(src==='default')div.dataset.pmSrc='default';
      div.style.cssText=`width:${w}px;height:${h}px;border-radius:${br};`;
      img._pmSh=div;img.after(div);
      img.classList.add(`${P}-img-hidden`);
    };
    if(img.complete&&(img.naturalWidth||img.offsetWidth))inject();
    else img.addEventListener('load',inject,{once:true});
  }

  function removeMosaic(){
    document.querySelectorAll(`.${ACTIVE}`).forEach(el=>{
      el.classList.remove(ACTIVE,`${P}-blur`,`${P}-redact`,`${P}-pixelate-text`);
      delete el.dataset.pmSrc;
      if(el._pmSh){el._pmSh.remove();el.classList.remove(`${P}-img-hidden`);delete el._pmSh;}
      if(el._pmCv){el._pmCv.remove();el.style.display='';delete el._pmCv;delete el._pmDone;}
    });
    updateCount();
  }

  function scanAndTag(root){
    if(!enabled)return;
    document.documentElement.style.setProperty('--pm-r',`${cfg.intensity}px`);
    document.documentElement.style.setProperty('--pm-tile',`${cfg.intensity}px`);
    const isDoc=!root||root===document;
    const base=isDoc?document:root;
    if(cfg.defaultRulesEnabled){
      try{
        const selStr=getActiveSelStr();
        if(!isDoc&&base.matches?.(selStr))applyTo(base,'default');
        base.querySelectorAll(selStr).forEach(el=>applyTo(el,'default'));
      }catch(_){}
      scanHandleText(base===document?document:root);
    }
    scanCustomRules(root);
    updateCount(document.querySelectorAll(`.${ACTIVE}`).length);
  }

  function scanHandleText(root){
    const SEL='article,[class*="post"],[class*="comment"],[class*="tweet"],[class*="card"],[class*="message"]';
    const self=root!==document&&root.matches?.(SEL)?[root]:[];
    const inner=root.querySelectorAll?[...root.querySelectorAll(SEL)]:[];
    [...self,...inner].forEach(c=>{
      if(c.closest?.(GUARD))return;
      const walker=document.createTreeWalker(c,NodeFilter.SHOW_TEXT,{
        acceptNode(n){
          if(!/@\w{2,30}/.test(n.nodeValue))return NodeFilter.FILTER_SKIP;
          if(n.parentElement?.closest('script,style,noscript,textarea,input'))return NodeFilter.FILTER_REJECT;
          if(n.parentElement?.dataset?.pmH)return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const nodes=[];let nd;
      while((nd=walker.nextNode()))nodes.push(nd);
      nodes.forEach(wrapHandleNode);
    });
  }

  function wrapHandleNode(textNode){
    const text=textNode.nodeValue;
    const re=/@\w{2,30}/g;
    if(!re.test(text))return;re.lastIndex=0;
    const frag=document.createDocumentFragment();
    let last=0,m;
    while((m=re.exec(text))!==null){
      if(m.index>last)frag.appendChild(document.createTextNode(text.slice(last,m.index)));
      const span=document.createElement('span');
      span.textContent=m[0];span.dataset.pmH='1';applyTo(span,'default');
      frag.appendChild(span);last=m.index+m[0].length;
    }
    if(last<text.length)frag.appendChild(document.createTextNode(text.slice(last)));
    textNode.parentNode?.replaceChild(frag,textNode);
  }

  function updateCount(n){
    if(!countEl)return;
    const total=document.querySelectorAll(`.${ACTIVE},.${P}-custom-active`).length;
    countEl.textContent=t('masked')(total);
    scheduleDefaultRulesBar();
  }

  let _defBarRaf=0;
  function scheduleDefaultRulesBar(){
    if(_defBarRaf||!panelEl||!panelEl.classList.contains('open'))return;
    _defBarRaf=requestAnimationFrame(()=>{_defBarRaf=0;renderDefaultRulesBar();});
  }

  function startObserver(){
    observerRef=new MutationObserver(mutations=>{
      mutations.forEach(({addedNodes})=>{
        addedNodes.forEach(node=>{if(node.nodeType===1)pendingNodes.add(node);});
      });
      clearTimeout(scanTimer);
      scanTimer=setTimeout(()=>{
        const batch=[...pendingNodes];pendingNodes.clear();
        batch.forEach(node=>scanAndTag(node));
      },DEBOUNCE);
    });
  }

  function syncObserver(){
    if(enabled){
      if(observerRef) observerRef.observe(document.body,{childList:true,subtree:true});
    } else {
      if(observerRef) observerRef.disconnect();
      clearTimeout(scanTimer);pendingNodes.clear();
    }
  }

  function setupExemption(){
    document.addEventListener('click',e=>{
      if(!e.altKey)return;
      const el=e.target.closest?.(`.${ACTIVE},.${P}-custom-active`);
      if(!el)return;
      e.preventDefault();e.stopPropagation();
      el.dataset.pmSkip='1';
      el.classList.remove(ACTIVE,`${P}-custom-active`,`${P}-blur`,`${P}-redact`,`${P}-pixelate-text`);
      delete el.dataset.pmRids;
      delete el.dataset.pmSrc;
      if(el._pmSh){el._pmSh.remove();el.classList.remove(`${P}-img-hidden`);delete el._pmSh;}
      if(el._pmCv){el._pmCv.remove();el.style.display='';delete el._pmCv;delete el._pmDone;}
      updateCount(document.querySelectorAll(`.${ACTIVE}`).length);
    },true);
  }

  function registerMenus(){
    try{
      GM_registerMenuCommand(t('menu_panel'),openPanel);
      GM_registerMenuCommand(t('menu_toggle'),onMasterToggle);
      GM_registerMenuCommand(
        isFabAllowedHere()?t('menu_hide_fab'):t('menu_show_fab'),
        ()=>{
          sessionFabOverride=!isFabAllowedHere();
          applyFabHidden();
          clearTimeout(fabRevealTimer);
          if(sessionFabOverride){
            fabSessionReveal=true;
            syncFabShow();
            triggerFabIntroPulse();
            fabRevealTimer=setTimeout(()=>{fabSessionReveal=false;syncFabShow();},FAB_REVEAL_MS);
          } else {
            fabSessionReveal=false;
            syncFabShow();
          }
          const sw=panelEl?.querySelector(`#${P}-fabsite`);
          if(sw)sw.classList.toggle('on',cfg.fabAllowlist.includes(location.hostname));
        }
      );
      GM_registerMenuCommand(
        cfg.fabAllowlist.includes(location.hostname)?t('menu_fabsite_remove'):t('menu_fabsite_add'),
        ()=>{
          const host=location.hostname;
          const on=!cfg.fabAllowlist.includes(host);
          cfg.fabAllowlist=on?[...cfg.fabAllowlist,host]:cfg.fabAllowlist.filter(h=>h!==host);
          sessionFabOverride=null;
          applyFabHidden();saveCfg();
          const sw=panelEl?.querySelector(`#${P}-fabsite`);
          if(sw)sw.classList.toggle('on',on);
          const ta=panelEl?.querySelector(`#${P}-fablist`);
          if(ta)ta.value=cfg.fabAllowlist.join('\n');
        }
      );
      GM_registerMenuCommand(t('menu_lang'),showLanguageDialog);
    }catch(_){}
  }

  function init(){
    loadCfg();
    if(!Array.isArray(cfg.customRules))cfg.customRules=[];
    enabled=cfg.persistent;
    injectStyles();
    const skVars=THEMES[cfg.theme]||THEMES.dark;
    SKELETON_VARS.forEach(k=>{if(skVars[k])document.documentElement.style.setProperty(k,skVars[k]);});
    applyHighlightDefault();

    const go=()=>{
      buildFab();buildPanel();registerMenus();setupExemption();startObserver();
      if(enabled){
        scanAndTag();
        if(customRulesActive())scanCustomRules();
      }
      syncObserver();
    };
    document.readyState==='loading'
      ?document.addEventListener('DOMContentLoaded',go)
      :go();
  }

  init();

})();
