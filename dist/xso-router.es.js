var Nt = Object.defineProperty;
var jt = (e, t, n) => t in e ? Nt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var pt = (e, t, n) => (jt(e, typeof t != "symbol" ? t + "" : t, n), n), ot = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var i = (e, t, n) => (ot(e, t, "read from private field"), n ? n.call(e) : t.get(e)), l = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, u = (e, t, n, r) => (ot(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var C = (e, t, n) => (ot(e, t, "access private method"), n);
function a(e, t, n, r) {
  if (a.null == t)
    throw new Error(`${n} is null and not a valid ${e}.`);
  if (a.invalid == t)
    throw new Error(`${n} is ${typeof r} and not a valid ${e}.`);
}
a.array = "array";
a.function = "function";
a.object = "object";
a.string = "string";
a.null = 0;
a.invalid = 1;
function Tt(e, t) {
  t == null && a(a.array, a.null, e, t), (typeof t != "object" || !Array.isArray(t)) && a(a.array, a.invalid, e, t);
}
function wt(e, t) {
  t == null && a(a.function, a.null, e, t), typeof t != "function" && a(a.function, a.invalid, e, t);
}
function $(e, t) {
  t == null && a(a.object, a.null, e, t), (typeof t != "object" || Array.isArray(t)) && a(a.object, a.invalid, e, t);
}
function Y(e, t) {
  t == null && a(a.string, a.null, e, t), typeof t != "string" && !(t instanceof String) && a(a.string, a.invalid, e, t);
}
function A(e) {
  return typeof e == "object" && e != null && Array.isArray(e);
}
function xt(e) {
  return typeof e == "function" && e != null;
}
function V(e) {
  return typeof e == "object" && e != null && !Array.isArray(e);
}
function Z(e) {
  return (typeof e == "string" || e instanceof String) && e != null;
}
const dt = [], mt = "_xso_com_", w = {
  COMPONENTS: dt,
  COMPONENTS_PREFIX: mt,
  getComponent: (e) => dt.find((t) => t.key == e).instance,
  isKey: (e) => e.indexOf(mt) == 0
};
var tt, L, R, _;
class ut {
  constructor(t, n) {
    l(this, tt, null);
    l(this, L, null);
    l(this, R, null);
    l(this, _, null);
    u(this, tt, t), u(this, L, n);
  }
  get current() {
    return i(this, _);
  }
  set current(t) {
    u(this, _, t), i(this, L).fire(this);
  }
  set(t) {
    return u(this, R, t), this;
  }
  get() {
    return i(this, R);
  }
}
tt = new WeakMap(), L = new WeakMap(), R = new WeakMap(), _ = new WeakMap();
ut.prototype.toString = function() {
  return this.current;
};
function $t(e, t, n) {
  $("Properties", t);
  const r = (o) => new Error(`Content of type ${typeof o} is not valid, only string, object, or array with objects.`);
  for (const o of Object.keys(t)) {
    const s = t[o];
    if (o == "_" && s)
      if (Z(s))
        e.textContent = s;
      else if (A(s))
        b(e, s, n);
      else if (V(s))
        b(e, [s], n);
      else
        throw r(s);
    else if (o == "$" && s)
      if (Z(s))
        e.innerHTML = s;
      else if (A(s))
        b(e, s, n, !0);
      else if (V(s))
        b(e, [s], n, !0);
      else
        throw r(s);
    else if (o == "text" && s)
      Y(o, s), e.innerText = s;
    else if (o == "html" && s)
      Y(o, s), e.innerHTML = s;
    else if (o == "style" && s) {
      $(o, s);
      for (const h of Object.keys(s))
        e.style[h] = s[h];
    } else if (o == "className" && s)
      Y(o, s), e.className = s;
    else if (o == "classList" && s)
      yt(e, s);
    else if (o == "class" && s) {
      if (Z(s))
        e.className = s;
      else if (A(s))
        yt(e, s);
      else if (s != null && s != null)
        throw new Error(`CSS Class of type ${typeof s} is not valid, only string or array of strings is accepted.`);
    } else
      o.indexOf("on") == 0 ? (wt(o, s), e.addEventListener(o.substring(2).toLowerCase(), s)) : e.setAttribute(o, s);
  }
}
function yt(e, t) {
  Tt(key, t);
  for (const n of t)
    Y(n), e.classList.add(n);
}
function b(e, t, n, r) {
  const o = [];
  if (V(t))
    if (t instanceof ut) {
      const s = b(e, t.get(), n);
      if (s.length == 0)
        throw new Error("Reference is empty with no valid elements.");
      if (s.length > 1)
        throw new Error("Reference with more than 1 element.");
      t.current = s[0];
    } else {
      const s = Object.keys(t);
      if (s.length > 1)
        throw new Error(`Object with more than 1 keys: ${s.join(", ")}`);
      if (s.length == 0)
        throw new Error("Object with no key, but one is required.");
      for (const h of s) {
        const f = t[h];
        if (w.isKey(h)) {
          const d = w.getComponent(h).clone();
          d.parent = e, d.render(f), n && n.appendChildComponent(d), o.push(d);
        } else {
          const d = document.createElement(h);
          $t(d, f, n), o.push(d), e.appendChild(d);
        }
      }
    }
  else if (A(t))
    for (const s of t)
      if (Z(s))
        if (r) {
          const h = document.createElement("span");
          h.innerHTML = s, e.appendChild(h), o.push(s);
        } else {
          const h = document.createTextNode(s);
          e.appendChild(h), o.push(s);
        }
      else
        b(e, s, n);
  else
    throw new Error(`View of type ${typeof t} is invalid, only object or array of objects.`);
  return o;
}
var I, F, E, D;
class gt {
  constructor(t, n) {
    l(this, I, null);
    l(this, F, null);
    l(this, E, null);
    l(this, D, null);
    u(this, I, t), u(this, E, n);
  }
  set val(t) {
    JSON.stringify(i(this, D)) != JSON.stringify(t) && (u(this, F, i(this, E)), u(this, E, t), u(this, D, JSON.stringify(t)), console.log("Props >> " + i(this, I).key(), t));
  }
  get val() {
    return i(this, E);
  }
  get previous() {
    return i(this, F);
  }
}
I = new WeakMap(), F = new WeakMap(), E = new WeakMap(), D = new WeakMap();
gt.prototype.toString = function() {
  return this.val;
};
var J, N, q, m, H, X, lt;
class vt {
  constructor(t, n, r) {
    l(this, X);
    l(this, J, null);
    l(this, N, null);
    l(this, q, null);
    l(this, m, null);
    l(this, H, 0);
    u(this, J, t), u(this, N, n), u(this, m, r);
  }
  set $val(t) {
    i(this, m) !== t && (C(this, X, lt).call(this, t), i(this, J).render(), i(this, N).fire(this));
  }
  get $val() {
    return i(this, m);
  }
  set val(t) {
    i(this, m) !== t && (C(this, X, lt).call(this, t), i(this, N).fire(this));
  }
  get val() {
    return i(this, m);
  }
  get previous() {
    return i(this, q);
  }
  get lastChanged() {
    return i(this, H);
  }
}
J = new WeakMap(), N = new WeakMap(), q = new WeakMap(), m = new WeakMap(), H = new WeakMap(), X = new WeakSet(), lt = function(t) {
  u(this, q, i(this, m)), u(this, m, t), u(this, H, Date.now());
};
vt.prototype.toString = function() {
  return this.val;
};
var z, P;
class Mt {
  constructor() {
    l(this, z, []);
    l(this, P, []);
  }
  add(t, n) {
    i(this, z).push({
      items: t,
      func: n
    });
  }
  fire(t) {
    const n = i(this, z).filter((r) => r.items.includes(t));
    for (const r of n)
      r && !i(this, P).includes(r.func) && (i(this, P).push(r.func), setTimeout(() => {
        i(this, P).splice(i(this, P).indexOf(r.func), 1), r.func();
      }, 0));
  }
}
z = new WeakMap(), P = new WeakMap();
function Ct(e) {
  return e instanceof v;
}
function ht(e) {
  if (!Ct(e))
    throw new Error("Invalid component, because not implement the component class.");
}
var j, p, S, O, g, B, k, U, G, c, T, x, et, Ot, nt, bt, it, Et, Q, at;
const ct = class {
  constructor(t) {
    l(this, et);
    l(this, nt);
    l(this, it);
    l(this, Q);
    l(this, j, !1);
    l(this, p, null);
    l(this, S, null);
    l(this, O, null);
    l(this, g, null);
    l(this, B, []);
    l(this, k, () => {
    });
    l(this, U, () => {
    });
    l(this, G, () => {
    });
    l(this, c, { elements: [], components: [] });
    l(this, T, new Mt());
    pt(this, "parent", null);
    l(this, x, null);
    if (!xt(t) || t.toString().indexOf("function") != 0)
      throw new Error("Only classic functions are used for components and arrow function is not supported.");
    u(this, p, t), C(this, et, Ot).call(this);
  }
  name() {
    return i(this, p).name;
  }
  clone() {
    return new ct(i(this, p));
  }
  childrenElements() {
    return [...i(this, c).elements];
  }
  childrenComponents() {
    return [...i(this, c).components];
  }
  appendChildComponent(t) {
    ht(t), i(this, c).components.push(t);
  }
  mount(t) {
    t ? u(this, k, t) : i(this, k).call(this);
  }
  unmount(t) {
    t ? u(this, U, t) : (C(this, it, Et).call(this), C(this, nt, bt).call(this), i(this, U).call(this));
  }
  view(t) {
    u(this, G, t);
  }
  ref() {
    return new ut(this, i(this, T));
  }
  changes(t, n) {
    i(this, T).add(t, n);
  }
  render(t) {
    var r;
    const n = this;
    i(this, O) ? (i(this, x) && clearTimeout(i(this, x)), u(this, x, setTimeout(() => {
      var o;
      C(o = n, Q, at).call(o, t);
    }, 0))) : C(r = n, Q, at).call(r, t);
  }
  static isSameKind(t, n) {
    let r = null;
    for (const s of Object.keys(t))
      r = s;
    const o = w.getComponent(r);
    return i(o, p) === i(n, p);
  }
  function() {
    return i(this, p);
  }
  key() {
    return i(this, S);
  }
  destroy() {
    const t = w.COMPONENTS.findIndex((n) => n.key == i(this, S));
    w.COMPONENTS.splice(t, 1);
  }
  state(t) {
    if (i(this, g))
      return i(this, B)[i(this, g).state++];
    const n = new vt(this, i(this, T), t);
    return i(this, B).push(n), n;
  }
};
let v = ct;
j = new WeakMap(), p = new WeakMap(), S = new WeakMap(), O = new WeakMap(), g = new WeakMap(), B = new WeakMap(), k = new WeakMap(), U = new WeakMap(), G = new WeakMap(), c = new WeakMap(), T = new WeakMap(), x = new WeakMap(), et = new WeakSet(), Ot = function() {
  for (; ; ) {
    const t = w.COMPONENTS_PREFIX + "[" + i(this, p).name + "]_" + (Math.random() + 1).toString(36).substring(2);
    if (!w.COMPONENTS.find((n) => n.key == t)) {
      u(this, S, t);
      break;
    }
  }
  w.COMPONENTS.push({ key: i(this, S), instance: this });
}, nt = new WeakSet(), bt = function() {
  if (i(this, c).elements.length > 0) {
    if (parent = i(this, c).elements[0].parentNode, parent == null)
      return;
    for (const t of i(this, c).elements)
      parent.contains(t) && parent.removeChild(t);
  }
}, it = new WeakSet(), Et = function() {
  for (const t of i(this, c).components)
    t.unmount();
  i(this, c).components = [];
}, Q = new WeakSet(), at = function(t) {
  i(this, O) ? t ? i(this, O).val = t : u(this, g, { state: 0 }) : u(this, O, new gt(this, t)), i(this, j) == !1 && i(this, p).bind(this)(i(this, O).val);
  let n = i(this, G).bind(this)();
  (!n || n.length == 0) && (n = [{ span: { style: { display: "none" } } }]);
  let r = null;
  i(this, g) && (r = i(this, c).elements[0].parentNode);
  const o = document.createDocumentFragment(), s = i(this, c).components;
  if (i(this, c).components = [], b(o, n, this), i(this, g)) {
    const h = [];
    for (const f of o.children)
      h.push(f);
    if (i(this, c).elements.length == 0)
      this.parent.appendChild(o);
    else {
      r.insertBefore(o, i(this, c).elements[0]);
      for (const f of s)
        f.unmount();
      for (const f of i(this, c).elements)
        r.contains(f) && r.removeChild(f);
    }
    i(this, c).elements = h;
  } else {
    for (const h of o.children)
      i(this, c).elements.push(h);
    this.parent.appendChild(o);
  }
  u(this, g, null), i(this, j) == !1 && (u(this, j, !0), i(this, k) && window.setTimeout(i(this, k), 0));
};
v.prototype.toString = function() {
  return this.key();
};
v.prototype.isSameKind = function(e, t) {
  return v.isSameKind(e, t);
};
function At(e) {
  $("Component Props", e);
  let t = null;
  for (const n of Object.keys(e)) {
    if (t != null)
      throw new Error(`More than 1 component in the same object: ${e}`);
    t = e[n], $("Component Props Loaded", t);
  }
  return t;
}
function Pt(e) {
  $("jsonDefinition of an invalid object.", e);
  let t = null;
  for (const r of Object.keys(e))
    t = r;
  let n = t;
  return t.indexOf(w.COMPONENTS_PREFIX) == 0 && (n = t.substring(t.indexOf("[") + 1, t.lastIndexOf("]"))), JSON.stringify({
    [n]: e[t]
  });
}
function K(e, t) {
  const n = (r) => new Error(`Only ${t.function().name} type is accepted! This component is invalid: ${Pt(r)}`);
  if (A(e)) {
    for (const r of e)
      if ($("ensureSameKind of an invalid object.", r), !v.isSameKind(r, t))
        throw n(r);
  } else if (V(e)) {
    if (!v.isSameKind(e, t))
      throw n(e);
  } else
    throw new Error("Invalid kind.");
}
K.required = (e, t) => {
  if (e)
    return K(e, t);
  throw new Error(`${t.name()} is required.`);
};
K.optional = (e, t) => {
  e && K(e, t);
};
function y(e) {
  return wt("Component", e), new v(e);
}
y.create = (e, t, n) => {
  ht(t), t.parent = e, t.render(n);
};
y.ensure = ht;
y.is = Ct;
y.ensureType = K;
y.props = At;
y.json = Pt;
function Kt({ path: e, component: t }) {
  const n = this.state(!1), r = this.state(null);
  this.updatePath = (o) => {
    const s = o.split("/"), h = e.split("/");
    let f = s.length == h.length;
    if (f) {
      r.val = {};
      for (const [d, M] of h.entries()) {
        const ft = s[d];
        let st = M.indexOf("{"), rt = M.indexOf("}");
        if (st == 0 && st + 1 < rt && rt == M.length - 1)
          r.val[M.substring(st + 1, rt)] = ft;
        else if (M != ft) {
          f = !1;
          break;
        }
      }
      if (f) {
        n.$val = !0;
        return;
      }
    }
    r.val = {}, n.$val = !1;
  }, this.view(() => n.val ? [
    {
      [t]: {
        route: {
          params: r.val
        }
      }
    }
  ] : []);
}
const Lt = y(Kt);
let St = null, kt = "/";
const W = y(function({ routes: e }) {
  y.ensureType(e, Lt), St = this;
  const t = e.map(() => this.ref());
  this.updatePath = (n) => {
    for (const r of t)
      r.current.updatePath(n);
  }, this.view(() => {
    const n = [];
    for (const [r, o] of e.entries())
      n.push(t[r].set(o));
    return n;
  });
});
W.updatePath = (e) => {
  kt = e, St.updatePath(e);
};
W.currentPath = () => kt;
window.addEventListener("load", function(e) {
  const t = window.location.pathname;
  W.updatePath(t);
});
window.addEventListener("popstate", function(e) {
  const t = window.location.pathname;
  W.updatePath(t);
});
function Rt(e) {
  const { to: t, top: n, onClick: r } = e, o = { ...e };
  delete o.to, delete o.top, delete o.onClick, this.view(() => [
    {
      a: {
        onClick: () => {
          let s = t, h = null;
          t.indexOf("#") >= 0 && (s = t.substring(0, t.indexOf("#")), h = t.substring(t.indexOf("#") + 1)), _t(s), h && window.setTimeout(() => location.hash = "#" + h, 0), n !== !1 && window.scrollTo(0, 0), r && r();
        },
        ...o
      }
    }
  ]);
}
const Ft = y(Rt);
function _t(e) {
  history.pushState(null, null, e), W.updatePath(e);
}
export {
  Ft as Navigate,
  Lt as Route,
  W as Router,
  _t as navigateTo
};
