document.addEventListener('DOMContentLoaded', () => {
  const calcularBtn = document.getElementById('btnCalcular');
  const importeInput = document.getElementById('importe');
  const kwhInput = document.getElementById('kwh');
  const resultado = document.getElementById('resultado');
  const compartirBtn = document.getElementById('btnCompartir');
  const copyMsg = document.getElementById('copyMsg');

  if (calcularBtn && resultado) {
    calcularBtn.addEventListener('click', () => {
      const importe = parseFloat(importeInput?.value || '');
      const kwh = parseFloat(kwhInput?.value || '');

      if (!importe || !kwh) {
        resultado.hidden = false;
        resultado.textContent = 'Introduce tu importe mensual y consumo para estimar tu ahorro.';
        resultado.classList.remove('resultado-ok');
        return;
      }

      const mediaMercado = 0.19;
      const ahorroEstimado = Math.max(0, importe - kwh * 0.119);
      const porcentaje = Math.max(0, (ahorroEstimado / (kwh * mediaMercado)) * 100);

      resultado.hidden = false;
      resultado.innerHTML = `Podrías ahorrar aproximadamente <strong>${ahorroEstimado.toFixed(2)} €</strong> al mes, lo que supone hasta un <strong>${porcentaje.toFixed(0)} %</strong> frente a la media del mercado.`;
      resultado.classList.add('resultado-ok');
    });
  }

  if (compartirBtn) {
    compartirBtn.addEventListener('click', async () => {
      copyMsg.textContent = '';
      copyMsg.classList.remove('copy-success');
      compartirBtn.disabled = true;

      try {
        const url = window.location.href;
        if (navigator.share) {
          await navigator.share({
            title: 'TuEnergíaExprés - Plan Amigo',
            text: 'Únete a TuEnergíaExprés y consigue 40 € con mi enlace.',
            url
          });
          copyMsg.textContent = 'Enlace compartido correctamente.';
        } else if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
          copyMsg.textContent = 'Enlace copiado al portapapeles.';
        } else {
          const inputAux = document.createElement('input');
          inputAux.value = url;
          document.body.appendChild(inputAux);
          inputAux.select();
          document.execCommand('copy');
          document.body.removeChild(inputAux);
          copyMsg.textContent = 'Enlace copiado al portapapeles.';
        }
        copyMsg.classList.add('copy-success');
      } catch (error) {
        console.error('No se pudo compartir el enlace', error);
        copyMsg.textContent = 'No hemos podido compartir el enlace. Inténtalo de nuevo.';
        copyMsg.classList.remove('copy-success');
      } finally {
        compartirBtn.disabled = false;
      }
    });
  }
});
