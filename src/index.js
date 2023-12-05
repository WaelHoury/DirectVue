const unlessDirective = {
  beforeMount(el, binding) {
    const placeholder = document.createComment(' v-unless ');
    el.__vueUnlessPlaceholder__ = placeholder;
    if (binding.value) {
      el.parentNode && el.parentNode.replaceChild(placeholder, el);
    }
  },
  updated(el, binding) {
    const conditionChanged = binding.value !== binding.oldValue;

    if (conditionChanged) {
      if (binding.value) {
        if (el.parentNode) {
          el.parentNode.replaceChild(el.__vueUnlessPlaceholder__, el);
        }
      } else {
        const placeholder = el.__vueUnlessPlaceholder__;
        if (placeholder.parentNode) {
          placeholder.parentNode.replaceChild(el, placeholder);
        }
      }
    }
  },
  unmounted(el) {
    delete el.__vueUnlessPlaceholder__;
  }
};

const hotkeyDirective = {
  beforeMount(el, binding) {
    const handler = (event) => {
      let keyCombination = '';
      if (event.ctrlKey) keyCombination += 'ctrl+';
      if (event.altKey) keyCombination += 'alt+';
      if (event.shiftKey) keyCombination += 'shift+';
      keyCombination += event.key.toLowerCase();

      if (binding.value[keyCombination]) {
        binding.value[keyCombination]();
      }
    };

    el.__vueHotkeyHandler = handler;

    window.addEventListener('keydown', handler);
  },
  unmounted(el) {
    if (el.__vueHotkeyHandler) {
      window.removeEventListener('keydown', el.__vueHotkeyHandler);
      delete el.__vueHotkeyHandler;
    }
  }
};

const clickOutsideDirective = {
  beforeMount(el, binding) {
    el.__vueClickOutside__ = function(event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };

    document.addEventListener('click', el.__vueClickOutside__);
  },
  unmounted(el) {
    document.removeEventListener('click', el.__vueClickOutside__);
    el.__vueClickOutside__ = null;
  }
};

const clipboardDirective = {
  beforeMount(el, binding) {
    el.clickHandler = () => {
      const textarea = document.createElement('textarea');
      textarea.value = binding.value;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.error('Oops, unable to copy', err);
      }
      document.body.removeChild(textarea);
    };

    el.addEventListener('click', el.clickHandler);
  },
  unmounted(el) {
    el.removeEventListener('click', el.clickHandler);
  }
};

const lazyDirective = {
  beforeMount(el, binding) {
    function loadImage() {
      const imageElement = Array.from(el.children).find((el) => el.nodeName === 'IMG');
      if (imageElement) {
        imageElement.addEventListener('load', () => {
          setTimeout(() => el.classList.add('loaded'), 100);
        });
        imageElement.addEventListener('error', () => console.error('Error loading image'));
        imageElement.src = binding.value;
      }
    }

    function handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: '0'
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }

    if (window['IntersectionObserver']) {
      createObserver();
    } else {
      loadImage();
    }
  }
};

const switchDirective = {
    beforeMount(el, binding) {
      el.__vueSwitchValue__ = binding.value;
      el.__vueCases__ = new Set();
  
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            updateCases(el, el.__vueSwitchValue__);
          }
        });
      });
  
      observer.observe(el, { childList: true });
      el.__vueSwitchObserver__ = observer;
    },
    updated(el, binding) {
      if (el.__vueSwitchValue__ !== binding.value) {
        el.__vueSwitchValue__ = binding.value;
        updateCases(el, binding.value);
      }
    },
    unmounted(el) {
      if (el.__vueSwitchObserver__) {
        el.__vueSwitchObserver__.disconnect();
      }
    }
  };
  
  const caseDirective = {
    mounted(el, binding) {
      el.__vueCaseValue__ = binding.value;
      let parent = el.parentNode;
      while (parent && !parent.__vueSwitchValue__) {
        parent = parent.parentNode;
      }
      if (parent && parent.__vueSwitchValue__) {
        parent.__vueCases__.add(el);
        updateCase(el, parent.__vueSwitchValue__);
      }
    },
    unmounted(el) {
      let parent = el.parentNode;
      while (parent && !parent.__vueSwitchValue__) {
        parent = parent.parentNode;
      }
      if (parent) {
        parent.__vueCases__.delete(el);
      }
    }
  };
  
  function updateCases(el, switchValue) {
    el.__vueCases__.forEach(caseEl => {
      updateCase(caseEl, switchValue);
    });
  }
  
  function updateCase(el, switchValue) {
    el.style.display = el.__vueCaseValue__ === switchValue ? '' : 'none';
  }
  const offlineDirective = {
    beforeMount(el, binding) {
      const offlineHandler = () => {
        if (!navigator.onLine) {
          binding.value.offlineCallback();
        } else {
          binding.value.onlineCallback();
        }
      };

      window.addEventListener('online', offlineHandler);
      window.addEventListener('offline', offlineHandler);
      onUnmounted(() => {
        window.removeEventListener('online', offlineHandler);
        window.removeEventListener('offline', offlineHandler);
      });
    }
  };

const resizableDirective = {
    mounted(el) {
        let startX, startY, startWidth, startHeight;

        const handleMouseDown = (e) => {
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(getComputedStyle(el).width, 10);
        startHeight = parseInt(getComputedStyle(el).height, 10);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        };

        const handleMouseMove = (e) => {
        const width = startWidth + (e.clientX - startX);
        const height = startHeight + (e.clientY - startY);

        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        };

        const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        };

        el.style.position = 'relative';
        const handle = document.createElement('div');
        handle.style.position = 'absolute';
        handle.style.bottom = '0';
        handle.style.right = '0';
        handle.style.width = '10px';
        handle.style.height = '10px';
        handle.style.cursor = 'se-resize';
        handle.style.backgroundColor = '#000';

        handle.addEventListener('mousedown', handleMouseDown);

        el.appendChild(handle);
    }
    };

export const DirectVue = {
  install(app) {
    app.directive('unless', unlessDirective);
    app.directive('hotkey', hotkeyDirective);
    app.directive('click-outside', clickOutsideDirective);
    app.directive('clipboard', clipboardDirective);
    app.directive('lazy', lazyDirective);
    app.directive('switch', switchDirective);
    app.directive('case', caseDirective);
    app.directive('offline', offlineDirective);
    app.directive('resizable', resizableDirective);
  }
};
