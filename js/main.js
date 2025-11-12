document.addEventListener('DOMContentLoaded', () => {
  const calcularBtn = document.getElementById('btnCalcular');
  const importeInput = document.getElementById('importe');
  const kwhInput = document.getElementById('kwh');
  const resultado = document.getElementById('resultado');
  const copyBtn = document.getElementById('btnCopiar');
  const copiadoMsg = document.getElementById('copiado');

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

  if (copyBtn && copiadoMsg) {
    copyBtn.addEventListener('click', async () => {
      copiadoMsg.hidden = true;
      copyBtn.disabled = true;

      const url = window.location.href;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
        } else {
          const inputAux = document.createElement('input');
          inputAux.value = url;
          document.body.appendChild(inputAux);
          inputAux.select();
          document.execCommand('copy');
          document.body.removeChild(inputAux);
        }

        copiadoMsg.textContent = '✅ Enlace copiado al portapapeles';
        copiadoMsg.hidden = false;
      } catch (error) {
        console.error('No se pudo copiar el enlace', error);
        copiadoMsg.textContent = 'No hemos podido copiar el enlace. Inténtalo de nuevo.';
        copiadoMsg.hidden = false;
      } finally {
        copyBtn.disabled = false;
      }
    });
  }

  if (copyLinkBtn && copyToast) {
    copyLinkBtn.addEventListener('click', async () => {
      try {
        const url = window.location.href;
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
        } else {
          const inputAux = document.createElement('input');
          inputAux.value = url;
          document.body.appendChild(inputAux);
          inputAux.select();
          document.execCommand('copy');
          document.body.removeChild(inputAux);
        }

        copyToast.hidden = false;
        copyToast.textContent = 'Enlace copiado al portapapeles.';
        copyToast.classList.add('copy-success');
      } catch (error) {
        console.error('No se pudo copiar el enlace', error);
        copyToast.hidden = false;
        copyToast.textContent = 'No hemos podido copiar el enlace. Inténtalo de nuevo.';
        copyToast.classList.remove('copy-success');
      }

      setTimeout(() => {
        copyToast.hidden = true;
        copyToast.textContent = 'Enlace copiado al portapapeles.';
        copyToast.classList.add('copy-success');
      }, 3000);
    });
  }
});
