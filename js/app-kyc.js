$('body').on('mousemove', '.btn-dashed, .lang a, .btn1, .btn2, .btn3, .btn4, .btn5, .btn6, .login-window__social ul li, .list_sh a, .btn_close_modal, .valutes_buttons a, .info_navigation_btn', function (e) {
   var x = e.pageX - $(this).offset().left;
   var y = e.pageY - $(this).offset().top;
   $(this).css({ '--x': `${x}px`, '--y': `${y}px` });
});
$('body').on('click', '[data-modal]', function () {
   if (!$('#' + $(this).data('modal')).length) return false;
   $('body').addClass('open_modal');
   $('#' + $(this).data('modal')).addClass('show');
   return false;
});
$(document).click(function (event) {
   if ($(event.target).closest(".inner_modal").length) return;
   $('body').removeClass('open_modal');
   $('.modal').removeClass('show');
   event.stopPropagation();
});
$('body').on('click', '.btn_close_modal, .close_modal', function () {
   $(this).closest('.modal').removeClass('show');
   if (!$('.modal.show').length) {
      $('body').removeClass('open_modal');
   }
});


if (typeof isMobile == 'undefined') {
   const isMobile = {
      Android: function () { return navigator.userAgent.match(/Android/i) },
      BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) },
      iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) },
      Opera: function () { return navigator.userAgent.match(/Opera Mini/i) },
      Windows: function () { return navigator.userAgent.match(/IEMobile/i) },
      any: function () {
         return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
      }
   };
   if (isMobile.any()) { document.body.classList.add('_touch') } else { document.body.classList.add('_pc') };
}

/* управление табами */
class TabsOpen {
   constructor(tabs, addFunctionResize, addFunctionAction, closeAfterSelection, selectElement) {
      this.tabs = document.querySelector(`${tabs}`);
      this.tabsList = this.tabs.querySelectorAll('.tabs');
      this.addFunctionResize = addFunctionResize;
      this.addFunctionAction = addFunctionAction;
      this.closeAfterSelection = closeAfterSelection == true ? true : false;
   }
   init = () => {
      document.body.addEventListener('click', this.examination);
      this.addFunctionResize && window.addEventListener('resize', this.externalFunction);
   };
   examination = (event) => {
      if (event.target.closest('.tabs-button') && !event.target.closest('.tabs').classList.contains('active')) {
         this.tabsList.forEach((element) => {
            element == event.target.closest('.tabs') ? this.open(element) : this.close(element);
         })
      } else if (this.closeAfterSelection || !event.target.closest('.tabs-content')) {
         this.tabsList.forEach(element => this.close(element));
      }
      if (event.target.closest('.tabs-content-inner') &&
         this.addFunctionAction &&
         event.target.closest('.tabs-content-inner').querySelector('.get-data')) {
         this.addFunctionAction(event)
      }
   }
   open = (element) => {
      element.querySelector('.tabs-content').style.height = this.getSize(element) + 'px';
      element.classList.add('active');
   };
   close = (element) => {
      element.querySelector('.tabs-content').style.height = '';
      element.classList.remove('active');
   };
   getSize = (element) => { return element.querySelector('.tabs-content-inner').clientHeight + 3 };
   externalFunction = () => { this.addFunctionResize() };
}
/* открывает меню выбора вида документа */
if (document.querySelector('.choice-menu')) {
   const TABS = new TabsOpen('.choice-menu', false, changeData, true).init();
}
/* запись выбранного значения в поле выбора */
function changeData(event) {
   if (event.target.closest('.tabs-content-inner')) {
      event.target.closest('.tabs').querySelector('.show-data').innerHTML
         = event.target.closest('.get-data').querySelector('.get-data-inner').innerHTML;
   }
}

class TabsSwitching {
   constructor(body__buttons, button, tab, execute) {
      this.body__buttons = body__buttons;
      this.name_button = button;
      this.button = document.querySelectorAll(button);
      this.tab = document.querySelectorAll(tab);
      this.execute = execute;
   }
   eventClick = () => {
      this.body__buttons.addEventListener('click', (event) => {
         if (event.target.closest(this.name_button)) {
            let n = event.target.closest(this.name_button).dataset.button;
            this.button.forEach((e) => { e.classList.toggle('active', e.dataset.button == n) });
            if (this.tab.length > 0) { this.tab.forEach((e) => { e.classList.toggle('active', e.dataset.tab == n) }) }
            if (this.execute) { this.execute(n) };
         }
      })
   }
}
/* инициалицауия табов  */
if (document.querySelector('.choice-menu__shell')) {
   new TabsSwitching(document.querySelector('.choice-menu__shell'), '.choice-menu__list-item', '.tabs-form', checkOption).eventClick();
}
function checkOption(i) {
   document.querySelector('#document').options[i].selected = true;
}
if (document.querySelector('.tabs-form')) {
   document.querySelectorAll('.tabs-form').forEach((e) => {
      new TabsSwitching(e, '.document-button', '.document-tab').eventClick();
   })
}
if (document.querySelector('.tabs-form')) {
   let tabsForms = document.querySelectorAll('.tabs-form');
   tabsForms.forEach((e) => e.addEventListener('change', (event) => checkingValidityPhoto(event)))
}
document.body.addEventListener('click', (event) => {
   /* проверка, выбрано ли фото */
   if (event.target.closest('.foto-document__button')) {
      checkingValidityPhoto(event)
   }
   /* удаление фото */
   if (event.target.closest('.foto-document__button-delete')) {
      deleteFoto(event)
   }
   if (event.target.closest('#copyLink')) {
      copyLink()
   }
})

function checkingValidityPhoto(event) {
   event.target.closest('form').querySelectorAll('.add-image').forEach((e) => {
      if (e.value == '') {
         e.closest('.foto-document__block').classList.add('not-valid')
         e.closest('.foto-document__block').classList.remove('valid')
      } else {
         e.closest('.foto-document__block').classList.remove('not-valid');
         e.closest('.foto-document__block').classList.add('valid')
      }
   })
}

function deleteFoto(event) {
   event.target.closest('.foto-document__content').querySelector('.add-image').value = '';
   checkingValidityPhoto(event)

}

/* смена экранов верификация с мобильного */
if (document.querySelector('.go-in-mobile')) {
   let screen1 = document.querySelector('.add-document');
   let screen2 = document.querySelector('.add-document__go-mobile');
   document.body.addEventListener('click', (event) => {
      if (event.target.closest('.go-in-mobile')) {
         screen2.removeAttribute('hidden');
         screen1.setAttribute('hidden', '');
      }
      if (event.target.closest('.add-document__button-back')) {
         screen1.removeAttribute('hidden');
         screen2.setAttribute('hidden', '');
      }
   })
}

function copyLink() {
   navigator.clipboard.writeText(document.querySelector('#copyLink_text').innerHTML)
      .then(() => {
         console.log('copy ok');
         document.querySelector('.copy-done') && showAlert();
      })
      .catch(err => {
         console.log('Something went wrong', err);
      });
}
function showAlert() {
   document.querySelector('.copy-done').classList.add('visible');
   setTimeout(() => { document.querySelector('.copy-done').classList.remove('visible') }, 2000)
}

let selectBlock = document.querySelector('#document');
let listMenu = document.querySelectorAll('.choice-menu__list-item');
if (selectBlock) {
   selectBlock.addEventListener('change', (event) => {
      listMenu.forEach((e) => {
         if (e.dataset.button == selectBlock.options.selectedIndex) {
            e.click();
         }
      })
   })
}


if (document.querySelector('.link-anim-long')) {
   let animLong = document.querySelectorAll('.link-anim-long');
   console.log(animLong[0].innerHTML);
   animLong.forEach((e) => {
      let string = e.innerHTML.split(' ').join(` </span><span>`);
      e.innerHTML = `<span>${string}</span>`
   })
}
