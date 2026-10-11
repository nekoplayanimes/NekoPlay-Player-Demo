(() => {
  const $ = id => document.getElementById(id);
  const video = $('video');
  const fmt = value => { if (!Number.isFinite(value) || value < 0) value = 0; return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`; };
  let toastTimer;
  function toast(message) { const el = $('status'); el.textContent = message; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => el.hidden = true, 2200); }
  function updatePlay() { const paused = video.paused; $('play').textContent = paused ? '▶' : 'Ⅱ'; $('bigPlay').textContent = paused ? '▶' : 'Ⅱ'; $('emptyState').hidden = Boolean(video.currentSrc); $('bigControls').style.opacity = paused ? '1' : ''; }
  function seekBy(delta) { if (Number.isFinite(video.duration)) video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + delta)); }
  async function togglePlay() { if (!video.currentSrc) { toast('Configure primeiro uma URL de vídeo autorizada.'); return; } try { if (video.paused) await video.play(); else video.pause(); } catch { toast('Não foi possível reproduzir. Verifique a URL e o formato do vídeo.'); } }
  $('play').addEventListener('click', togglePlay); $('bigPlay').addEventListener('click', togglePlay);
  $('back10').addEventListener('click', () => seekBy(-10)); $('skipBack').addEventListener('click', () => seekBy(-10)); $('forward10').addEventListener('click', () => seekBy(10)); $('skipForward').addEventListener('click', () => seekBy(10));
  $('seek').addEventListener('input', () => { if (Number.isFinite(video.duration)) video.currentTime = Number($('seek').value) / 1000 * video.duration; });
  $('volume').addEventListener('input', () => { video.volume = Number($('volume').value); video.muted = video.volume === 0; $('mute').textContent = video.muted ? '🔇' : '🔊'; });
  $('mute').addEventListener('click', () => { video.muted = !video.muted; $('mute').textContent = video.muted ? '🔇' : '🔊'; });
  $('cc').addEventListener('click', () => { const tracks = video.textTracks; if (!tracks.length) { toast('Carregue um arquivo WebVTT para ativar legendas.'); return; } const enabled = [...tracks].some(t => t.mode === 'showing'); [...tracks].forEach(t => t.mode = enabled ? 'disabled' : 'showing'); $('subtitleSelect').value = enabled ? 'off' : 'on'; });
  $('subtitleSelect').addEventListener('change', () => { [...video.textTracks].forEach(t => t.mode = $('subtitleSelect').value === 'on' ? 'showing' : 'disabled'); });
  $('full').addEventListener('click', async () => { try { if (!document.fullscreenElement) await $('playerFrame').requestFullscreen(); else await document.exitFullscreen(); } catch { toast('Tela cheia não está disponível neste navegador.'); } });
  video.addEventListener('play', updatePlay); video.addEventListener('pause', updatePlay); video.addEventListener('ended', updatePlay);
  video.addEventListener('timeupdate', () => { $('current').textContent = fmt(video.currentTime); if (Number.isFinite(video.duration) && video.duration > 0 && !$('seek').matches(':active')) $('seek').value = String(Math.round(video.currentTime / video.duration * 1000)); });
  video.addEventListener('loadedmetadata', () => { $('duration').textContent = fmt(video.duration); $('runtime').textContent = fmt(video.duration); $('qualityTag').textContent = 'FONTE'; $('emptyState').hidden = true; $('playerNote').textContent = 'Metadados carregados. Teste reprodução, busca e legendas no dispositivo desejado.'; updatePlay(); });
  video.addEventListener('error', () => toast('Falha ao carregar a mídia. Confira URL HTTPS, formato e permissões CORS.'));
  $('loadMedia').addEventListener('click', () => {
    const source = $('videoUrl').value.trim(); const vtt = $('vttUrl').value.trim();
    try { const url = new URL(source); if (url.protocol !== 'https:') throw new Error('https'); } catch { toast('Informe uma URL HTTPS válida para o vídeo.'); $('videoUrl').focus(); return; }
    if (vtt) { try { const url = new URL(vtt); if (url.protocol !== 'https:') throw new Error('https'); } catch { toast('A URL da legenda também precisa ser HTTPS.'); $('vttUrl').focus(); return; } }
    video.pause(); video.removeAttribute('src'); video.querySelectorAll('source').forEach(el => el.remove());
    const oldTrack = video.querySelector('track'); if (oldTrack) oldTrack.remove();
    if (vtt) { const track = document.createElement('track'); track.kind = 'subtitles'; track.srclang = $('subtitleLang').value; track.label = $('subtitleLang').selectedOptions[0].textContent; track.src = vtt; track.default = true; video.append(track); }
    video.src = source; video.load(); $('episodeTitle').textContent = $('episodeName').value.trim() || 'Vídeo de demonstração'; $('subtitleSelect').value = vtt ? 'on' : 'off'; $('playerNote').textContent = 'Carregando mídia…'; $('emptyState').hidden = true; toast('Fonte adicionada. Aguardando metadados…');
  });
  $('episodeName').addEventListener('input', () => { if (!$('videoUrl').value.trim()) $('episodeTitle').textContent = $('episodeName').value.trim() || 'Player de demonstração'; });
  updatePlay();
})();
