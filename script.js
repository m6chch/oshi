document.addEventListener("DOMContentLoaded", () => {
    // キャラクターごとのデータを管理する配列
    // 今後キャラが増えた場合は、このオブジェクトを後ろに追加するだけで対応可能です
    const oshiList = [
        {
            folder: "miku",
            name: "中野三玖",
            // 存在する画像ファイル名を正確に配列に格納します
            images: [
                "miku.jpg",
                "miku2.jpg",
                "miku3.jpg",
                "miku4.jpg",
                "miku5.jpg",
                "miku6.jpg"
            ],
            textFile: "miku.txt"
        }
    ];

    const container = document.getElementById("oshi-container");

    oshiList.forEach(oshi => {
        // キャラクターごとのセクションを作成
        const section = document.createElement("section");
        section.className = "oshi-section";

        // 名前の表示
        const title = document.createElement("h2");
        title.textContent = oshi.name;
        section.appendChild(title);

        // テキスト表示エリアの作成
        const textWrapper = document.createElement("div");
        textWrapper.className = "oshi-text-wrapper";
        section.appendChild(textWrapper);

        // txtファイルの読み込み（非同期処理）
        fetch(`oshi/${oshi.folder}/${oshi.textFile}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${oshi.textFile}`);
                }
                return response.text();
            })
            .then(text => {
                const pre = document.createElement("pre");
                pre.textContent = text;
                textWrapper.appendChild(pre);
            })
            .catch(error => {
                console.error(error);
                textWrapper.innerHTML = `<p class="error-msg">※プロフィールの読み込みに失敗しました。<br>(ローカル環境で直接HTMLを開いているか、パスが間違っている可能性があります)</p>`;
            });

        // 画像ギャラリーエリアの作成
        const gallery = document.createElement("div");
        gallery.className = "oshi-gallery";

        oshi.images.forEach(imgName => {
            const img = document.createElement("img");
            img.src = `oshi/${oshi.folder}/${imgName}`;
            img.alt = `${oshi.name}の画像`;
            img.loading = "lazy"; // 読み込み最適化
            gallery.appendChild(img);
        });

        section.appendChild(gallery);
        container.appendChild(section);
    });
});
