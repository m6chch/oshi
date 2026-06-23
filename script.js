document.addEventListener("DOMContentLoaded", () => {
    // キャラクターごとのデータを管理する配列
    const oshiList = [
        {
            folder: "miku",
            name: "中野三玖",
            images: [
                "miku.jpg",
                "miku2.jpg",
                "miku3.jpg",
                "miku4.jpg",
                "miku5.jpg",
                "miku6.jpg"
            ],
            textFile: "miku.txt",
            // ▼ ここにリンクを追加。不要なものは ""（空文字）にするか消してください
            links: {
                x: "https://x.com/5Hanayome_anime",
                youtube: "",
                website: "https://www.tbs.co.jp/anime/5hanayome/"
            }
        },
        {
            folder: "nekotatsu",
            name: "猫汰つな",
            images: [
                "nekotatsu.jpg",
                "nekotatsu2.png"
            ],
            textFile: "nekotatsu.txt",
            // ▼ ここにリンクを追加。不要なものは ""（空文字）にするか消してください
            links: {
                x: "https://x.com/tsuna_nekota",
                youtube: "https://www.youtube.com/@tsuna_nekota",
                website: "https://store.vspo.jp/collections/tsuna-nekota?srsltid=AfmBOorTfWmXTflGYKJrWFq_QvToLIsS3i8w7IscDbobUklmzfOZ5HMg"
            }
        }
    ];

    const container = document.getElementById("oshi-container");

    oshiList.forEach(oshi => {
        const section = document.createElement("section");
        section.className = "oshi-section";

        // 名前の表示
        const title = document.createElement("h2");
        title.textContent = oshi.name;
        section.appendChild(title);

        // ▼ 公式リンクボタンエリアの作成
        if (oshi.links) {
            const linksWrapper = document.createElement("div");
            linksWrapper.className = "oshi-links";

            // X (Twitter) のボタン
            if (oshi.links.x) {
                const linkX = document.createElement("a");
                linkX.href = oshi.links.x;
                linkX.className = "btn-link btn-x";
                linkX.textContent = "𝕏 Official";
                linkX.target = "_blank"; // 別タブで開く
                linkX.rel = "noopener noreferrer"; // セキュリティ対策
                linksWrapper.appendChild(linkX);
            }

            // YouTube のボタン
            if (oshi.links.youtube) {
                const linkYt = document.createElement("a");
                linkYt.href = oshi.links.youtube;
                linkYt.className = "btn-link btn-youtube";
                linkYt.textContent = "YouTube";
                linkYt.target = "_blank";
                linkYt.rel = "noopener noreferrer";
                linksWrapper.appendChild(linkYt);
            }

            // Webサイト のボタン
            if (oshi.links.website) {
                const linkWeb = document.createElement("a");
                linkWeb.href = oshi.links.website;
                linkWeb.className = "btn-link btn-website";
                linkWeb.textContent = "Official Site";
                linkWeb.target = "_blank";
                linkWeb.rel = "noopener noreferrer";
                linksWrapper.appendChild(linkWeb);
            }

            // ボタンが1つでも生成されていればセクションに追加
            if (linksWrapper.hasChildNodes()) {
                section.appendChild(linksWrapper);
            }
        }

        // テキスト表示エリアの作成
        const textWrapper = document.createElement("div");
        textWrapper.className = "oshi-text-wrapper";
        section.appendChild(textWrapper);

        fetch(`oshi/${oshi.folder}/${oshi.textFile}`)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load`);
                return response.text();
            })
            .then(text => {
                const pre = document.createElement("pre");
                pre.textContent = text;
                textWrapper.appendChild(pre);
            })
            .catch(error => {
                textWrapper.innerHTML = `<p class="error-msg">※テキストの読み込みに失敗しました。</p>`;
            });

        // 画像ギャラリーエリアの作成
        const gallery = document.createElement("div");
        gallery.className = "oshi-gallery";

        oshi.images.forEach(imgName => {
            const img = document.createElement("img");
            img.src = `oshi/${oshi.folder}/${imgName}`;
            img.alt = `${oshi.name}の画像`;
            img.loading = "lazy";
            gallery.appendChild(img);
        });

        section.appendChild(gallery);
        container.appendChild(section);
    });
});
