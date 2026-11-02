(function(){
  var toggle=document.querySelector('.nav-toggle'), menu=document.getElementById('menu');
  function close(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');}
  toggle.addEventListener('click',function(){
    var open=menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded',open?'true':'false');
    toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){close();}});


  // quote form via FormSubmit (AJAX, falls back to normal POST)
  var form=document.getElementById('quote');
  if(form&&window.fetch){
    form.addEventListener('submit',function(e){
      if(form.querySelector('.hp').value){e.preventDefault();return;}
      e.preventDefault();
      var status=form.querySelector('.form-status'), btn=form.querySelector('button');
      btn.disabled=true;status.textContent='Sending...';
      var url=form.action.replace('formsubmit.co/','formsubmit.co/ajax/');
      fetch(url,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d&&String(d.success)==='true'){form.reset();status.textContent='Thanks! Your request was sent. Our team will be in touch soon.';}
          else{throw new Error('fail');}
        })
        .catch(function(){status.textContent='Sorry, that didn\u2019t send. Please call 519-271-1723 or email info@brownheatcool.com.';})
        .finally(function(){btn.disabled=false;});
    });
  }
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
})();

