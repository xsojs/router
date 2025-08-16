function l(e, t, n, i) {
  if (l.null == t)
    throw new Error(`${n} is null and not a valid ${e}.`);
  if (l.invalid == t)
    throw new Error(`${n} is ${typeof i} and not a valid ${e}.`);
}
l.array = "array";
l.function = "function";
l.object = "object";
l.string = "string";
l.null = 0;
l.invalid = 1;
function D(e, t) {
  t == null && l(l.array, l.null, e, t), (typeof t != "object" || !Array.isArray(t)) && l(l.array, l.invalid, e, t);
}
function x(e, t) {
  t == null && l(l.function, l.null, e, t), typeof t != "function" && l(l.function, l.invalid, e, t);
}
function m(e, t) {
  t == null && l(l.object, l.null, e, t), (typeof t != "object" || Array.isArray(t)) && l(l.object, l.invalid, e, t);
}
function C(e, t) {
  t == null && l(l.string, l.null, e, t), typeof t != "string" && !(t instanceof String) && l(l.string, l.invalid, e, t);
}
function w(e) {
  return typeof e == "object" && e != null && Array.isArray(e);
}
function F(e) {
  return typeof e == "function" && e != null;
}
function O(e) {
  return typeof e == "object" && e != null && !Array.isArray(e);
}
function $(e) {
  return (typeof e == "string" || e instanceof String) && e != null;
}
const k = [], T = "_xso_com_", f = {
  COMPONENTS: k,
  COMPONENTS_PREFIX: T,
  getComponent: (e) => {
    const t = k.find((n) => n.key == e);
    return t ? t.instance : null;
  },
  isKey: (e) => e.indexOf(T) == 0
};
class N {
  #i = null;
  #t = null;
  #s = null;
  #e = null;
  constructor(t, n) {
    this.#i = t, this.#t = n;
  }
  get current() {
    return this.#e;
  }
  set current(t) {
    this.#e = t, this.#t.fire(this);
  }
  set(t) {
    return this.#s = t, this;
  }
  get() {
    return this.#s;
  }
}
N.prototype.toString = function() {
  return this.current;
};
function b(e, t, n, i) {
  m("Properties", t);
  for (const r of Object.keys(t)) {
    const s = t[r];
    if (r === "_" && s)
      w(s) ? d(e, s, n, !1, i) : O(s) ? d(e, [s], n, !1, i) : e.textContent = s;
    else if (r === "$" && s)
      w(s) ? d(e, s, n, !0, i) : O(s) ? d(e, [s], n, !0, i) : e.innerHTML = s;
    else if (r === "text" && s)
      C(r, s), e.innerText = s;
    else if (r === "html" && s)
      C(r, s), e.innerHTML = s;
    else if (r === "style" && s) {
      m(r, s);
      for (const o of Object.keys(s))
        o.indexOf("--") === 0 ? e.style.setProperty(o, s[o]) : e.style[o] = s[o];
    } else if (r === "className" && s)
      C(r, s), e.className instanceof SVGAnimatedString ? e.className.baseVal = s : e.className = s;
    else if (r === "classList" && s)
      e.className instanceof SVGAnimatedString ? e.className.baseVal = s.join(" ") : j(r, e, s);
    else if (r === "class" && s) {
      if ($(s))
        e.className instanceof SVGAnimatedString ? e.className.baseVal = s : e.className = s;
      else if (w(s))
        j(r, e, s);
      else if (s != null)
        throw new Error(`CSS Class of type ${typeof s} is not valid, only string or array of strings is accepted.`);
    } else r.indexOf("on") === 0 ? s && (x(r, s), e.addEventListener(r.substring(2).toLowerCase(), s)) : s != null && e.setAttribute(r, s);
  }
}
function j(e, t, n) {
  D(e, n);
  for (const i of n)
    C(e, i), t.classList.add(i);
}
function d(e, t, n, i = !1, r) {
  const s = [];
  if (O(t))
    if (t instanceof N) {
      const o = d(e, t.get(), n);
      if (o.length === 0)
        throw new Error("Reference is empty with no valid elements.");
      if (o.length > 1)
        throw new Error("Reference with more than 1 element.");
      t.current = o[0];
    } else {
      const o = Object.keys(t);
      if (o.length > 1)
        throw new Error(`Object with more than 1 keys: ${o.join(", ")}`);
      if (o.length === 0)
        throw new Error("Object with no key, but one is required.");
      for (const a of o) {
        const c = t[a];
        if (f.isKey(a)) {
          let u = f.getComponent(a);
          if (u)
            u = u.clone(), u.parent = e, u.render(c), n && n.appendChildComponent(u), s.push(u);
          else {
            const y = document.createElement("xso-com-error");
            y.innerText = "# XSO Component Error #", e.appendChild(y);
          }
        } else if (a === "svg" && !c.xmlns && !r && (r = "http://www.w3.org/2000/svg"), c.xmlns) {
          const u = document.createElementNS(c.xmlns, a);
          b(u, c, n, c.xmlns), s.push(u), e.appendChild(u);
        } else if (r) {
          const u = document.createElementNS(r, a);
          b(u, c, n, r), s.push(u), e.appendChild(u);
        } else {
          const u = document.createElement(a);
          b(u, c, n), s.push(u), e.appendChild(u);
        }
      }
    }
  else if (w(t))
    for (const o of t)
      if ($(o))
        if (i) {
          const a = document.createElement("span");
          a.innerHTML = o, e.appendChild(a), s.push(o);
        } else {
          const a = document.createTextNode(o);
          e.appendChild(a), s.push(o);
        }
      else
        d(e, o, n, !1, r);
  else if (t != null)
    throw new Error(`View of type ${typeof t} is invalid, only object or array of objects.`);
  return s;
}
class A {
  #i = null;
  #t = null;
  #s = null;
  #e = null;
  constructor(t, n) {
    this.#i = t, this.#s = n;
  }
  set val(t) {
    JSON.stringify(this.#e) !== JSON.stringify(t) && (this.#t = this.#s, this.#s = t, this.#e = JSON.stringify(t));
  }
  get val() {
    return this.#s;
  }
  get previous() {
    return this.#t;
  }
}
A.prototype.toString = function() {
  return this.val;
};
class M {
  #i = null;
  #t = null;
  #s = null;
  #e = null;
  #o = 0;
  constructor(t, n, i) {
    this.#i = t, this.#t = n, this.#e = i;
  }
  set $val(t) {
    this.#e !== t && (this.#r(t), this.#i.render(), this.#t.fire(this));
  }
  get $val() {
    return this.#e;
  }
  set val(t) {
    this.#e !== t && (this.#r(t), this.#t.fire(this));
  }
  get val() {
    return this.#e;
  }
  get previous() {
    return this.#s;
  }
  get lastChanged() {
    return this.#o;
  }
  #r(t) {
    this.#s = this.#e, this.#e = t, this.#o = Date.now();
  }
}
M.prototype.toString = function() {
  return this.val;
};
class K {
  #i = [];
  #t = [];
  add(t, n) {
    this.#i.push({
      items: t,
      func: n
    });
  }
  fire(t) {
    const n = this.#i.filter((i) => i.items.includes(t));
    for (const i of n)
      i && !this.#t.includes(i.func) && (this.#t.push(i.func), setTimeout(() => {
        this.#t.splice(this.#t.indexOf(i.func), 1), i.func();
      }, 0));
  }
}
function R(e) {
  return e instanceof p;
}
function P(e) {
  if (!R(e))
    throw new Error("Invalid component, because not implement the component class.");
}
class p {
  #i = !1;
  #t = null;
  #s = null;
  #e = null;
  #o = null;
  #r = null;
  #h = [];
  #l = () => {
  };
  #c = () => {
  };
  #f = () => {
  };
  #n = { elements: [], components: [] };
  #a = new K();
  parent = null;
  #u = null;
  constructor(t, n) {
    if (!F(t) || t.toString().indexOf("function") != 0)
      throw new Error("Only classic functions are used for components and arrow function is not supported.");
    this.#t = t, this.#s = n, this.#d();
  }
  #d() {
    for (; ; ) {
      const t = f.COMPONENTS_PREFIX + "[" + this.name() + "]_" + (Math.random() + 1).toString(36).substring(2);
      if (!f.COMPONENTS.find((n) => n.key == t)) {
        this.#e = t;
        break;
      }
    }
    f.COMPONENTS.push({ key: this.#e, instance: this });
  }
  name() {
    return this.#t.name;
  }
  clone() {
    return new p(this.#t, this.#s);
  }
  logErrorStack() {
    window.setTimeout(() => console.error(this.name() + " >> Component" + this.#s), 0);
  }
  childrenElements() {
    return [...this.#n.elements];
  }
  childrenComponents() {
    return [...this.#n.components];
  }
  appendChildComponent(t) {
    P(t), this.#n.components.push(t);
  }
  #m() {
    if (this.#n.elements.length > 0) {
      if (parent = this.#n.elements[0].parentNode, parent == null)
        return;
      for (const t of this.#n.elements)
        parent.contains(t) && parent.removeChild(t);
    }
  }
  #y() {
    for (const t of this.#n.components)
      t.unmount();
    this.#n.components = [];
  }
  mount(t) {
    t ? this.#l = t : this.#l();
  }
  unmount(t) {
    t ? this.#c = t : (this.#y(), this.#m(), this.#c());
  }
  view(t) {
    this.#f = t;
  }
  ref() {
    return new N(this, this.#a);
  }
  changes(t, n) {
    this.#a.add(t, n);
  }
  render(t) {
    try {
      const n = this;
      this.#o ? (this.#u && clearTimeout(this.#u), this.#u = setTimeout(() => {
        n.#p(t);
      }, 0)) : n.#p(t);
    } catch (n) {
      throw this.logErrorStack(), n;
    }
  }
  #p(t) {
    this.#o ? t ? this.#o.val = t : this.#r = { state: 0 } : this.#o = new A(this, t), this.#i == !1 && this.#t.bind(this)(this.#o.val);
    let n = this.#f.bind(this)();
    (!n || n.length == 0) && (n = [{ span: { style: { display: "none" } } }]);
    let i = null;
    this.#r && (i = this.#n.elements[0].parentNode);
    const r = document.createDocumentFragment(), s = this.#n.components;
    if (this.#n.components = [], d(r, n, this), this.#r) {
      const o = [];
      for (const a of r.children)
        o.push(a);
      if (this.#n.elements.length == 0)
        this.parent.appendChild(r);
      else {
        i.insertBefore(r, this.#n.elements[0]);
        for (const a of s)
          a.unmount();
        for (const a of this.#n.elements)
          i.contains(a) && i.removeChild(a);
      }
      this.#n.elements = o;
    } else {
      for (const o of r.children)
        this.#n.elements.push(o);
      this.parent.appendChild(r);
    }
    this.#r = null, this.#i == !1 && (this.#i = !0, this.#l && window.setTimeout(this.#l, 0));
  }
  static isSameType(t, n) {
    let i = null;
    for (const s of Object.keys(t))
      i = s;
    return f.getComponent(i).#t === n.#t;
  }
  function() {
    return this.#t;
  }
  key() {
    return this.#e;
  }
  destroy() {
    const t = f.COMPONENTS.findIndex((n) => n.key == this.#e);
    f.COMPONENTS.splice(t, 1);
  }
  state(t) {
    if (this.#r)
      return this.#h[this.#r.state++];
    const n = new M(this, this.#a, t);
    return this.#h.push(n), n;
  }
}
p.prototype.toString = function() {
  return this.key();
};
function J(e) {
  m("Component Props", e);
  let t = null;
  for (const n of Object.keys(e)) {
    if (t != null)
      throw new Error(`More than 1 component in the same object: ${e}`);
    t = e[n], m("Component Props Loaded", t);
  }
  return t;
}
function L(e) {
  m("jsonDefinition of an invalid object.", e);
  let t = null;
  for (const i of Object.keys(e))
    t = i;
  let n = t;
  return t.indexOf(f.COMPONENTS_PREFIX) == 0 && (n = t.substring(t.indexOf("[") + 1, t.lastIndexOf("]"))), JSON.stringify({
    [n]: e[t]
  });
}
function g(e, t) {
  const n = (i) => new Error(`Only ${t.function().name} type is accepted! This component is invalid: ${L(i)}`);
  if (w(e)) {
    for (const i of e)
      if (m("ensureSameKind of an invalid object.", i), !p.isSameType(i, t))
        throw n(i);
  } else if (O(e)) {
    if (!p.isSameType(e, t))
      throw n(e);
  } else
    throw new Error("Invalid kind.");
}
g.required = (e, t) => {
  if (e)
    return g(e, t);
  throw new Error(`${t.name()} is required.`);
};
g.optional = (e, t) => {
  e && g(e, t);
};
function h(e) {
  return x("Component", e), new p(e, new Error().stack);
}
h.create = (e, t, n) => {
  P(t), t.parent = e, t.render(n);
};
h.ensure = P;
h.is = R;
h.isSameType = p.isSameType;
h.ensureType = g;
h.props = J;
h.json = L;
function X({ path: e, component: t }) {
  const n = this.state(!1), i = this.state(null);
  this.updatePath = (r) => {
    const s = r.split("/"), o = e.split("/");
    let a = s.length == o.length;
    if (a) {
      i.val = {};
      for (const [c, u] of o.entries()) {
        const y = s[c];
        let S = u.indexOf("{"), E = u.indexOf("}");
        if (S == 0 && S + 1 < E && E == u.length - 1)
          i.val[u.substring(S + 1, E)] = y;
        else if (u != y) {
          a = !1;
          break;
        }
      }
      if (a) {
        n.$val = !0;
        return;
      }
    }
    i.val = {}, n.$val = !1;
  }, this.view(() => n.val ? [
    {
      [t]: {
        route: {
          params: i.val
        }
      }
    }
  ] : []);
}
const q = h(X);
let _ = null, I = "/";
const v = h(function({ routes: t }) {
  h.ensureType(t, q), _ = this;
  const n = t.map(() => this.ref());
  this.updatePath = (i) => {
    for (const r of n)
      r.current.updatePath(i);
  }, this.view(() => {
    const i = [];
    for (const [r, s] of t.entries())
      i.push(n[r].set(s));
    return i;
  });
});
v.updatePath = (e) => {
  I = e, _.updatePath(e);
};
v.currentPath = () => I;
window.addEventListener("load", function(e) {
  const t = window.location.pathname;
  v.updatePath(t);
});
window.addEventListener("popstate", function(e) {
  const t = window.location.pathname;
  v.updatePath(t);
});
function G(e) {
  const { to: t, top: n, onClick: i } = e, r = { ...e };
  delete r.to, delete r.top, delete r.onClick, this.view(() => [
    {
      a: {
        href: t || "#",
        onClick: (s) => {
          s.preventDefault();
          let o = t, a = null;
          return t.indexOf("#") >= 0 && (o = t.substring(0, t.indexOf("#")), a = t.substring(t.indexOf("#") + 1)), H(o), a && window.setTimeout(() => location.hash = "#" + a, 0), n !== !1 && window.scrollTo(0, 0), i && i(), !1;
        },
        ...r
      }
    }
  ]);
}
const z = h(G);
function H(e) {
  history.pushState(null, null, e), v.updatePath(e);
}
export {
  z as Navigate,
  q as Route,
  v as Router,
  H as navigateTo
};
