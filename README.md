# NekoPlay Player Demo

Protótipo independente para testar o player sem login, Supabase ou catálogo. Não inclui episódios, anúncios reais, nem mídia protegida por direitos autorais.

## Como testar
1. Publique esta pasta em um repositório separado no GitHub e ative **Settings → Pages → Deploy from a branch** (branch `main`, pasta `/root`).
2. Abra a página publicada em HTTPS.
3. Em **Conectar mídia de teste**, informe uma URL HTTPS de vídeo MP4/WebM que você criou ou tem autorização para transmitir. Opcionalmente, informe uma URL HTTPS para legenda `.vtt`.
4. Toque em **Carregar mídia autorizada** e teste controles, legendas, busca, volume e tela cheia.

## Limitações importantes
- A página estática não hospeda mídia, não oferece proteção contra cópias e não mede sozinha FPS ou latência de rede de forma confiável.
- O servidor de mídia pode precisar habilitar CORS para o domínio do GitHub Pages.
- A qualidade e os formatos disponíveis dependem do arquivo e do navegador; não existe seletor de resolução adaptativa nesta demonstração.
- O cartão de anúncio de 10 segundos é apenas visual; não há anúncio real nem sistema de monetização implementado.
- A URL do vídeo e a URL da legenda são configuradas no navegador e não são salvas no projeto.
