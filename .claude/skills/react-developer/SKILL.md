---
name: react-developer
description: Comprehensive React development assistant for building modern web applications. Covers React components, hooks, state management, TypeScript integration, performance optimization, testing, and framework patterns (Next.js, React Router). Follows official React best practices from react.dev.
---

# React Developer Skill

A comprehensive toolkit for React development covering modern patterns, best practices, and common workflows from the official React documentation.

## When to Use This Skill

Use this skill when you need to:
- Create React components with proper patterns
- Implement hooks (useState, useEffect, useContext, etc.)
- Build forms and handle user interactions
- Manage application state effectively
- Optimize React application performance
- Integrate TypeScript with React
- Work with React frameworks (Next.js, React Router)
- Test React components
- Debug React applications
- Follow React best practices and conventions

## Core React Concepts

### Component Creation

**Functional Components** (Preferred)
```jsx
// Basic component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// With TypeScript
interface WelcomeProps {
  name: string;
  age?: number;
}

function Welcome({ name, age }: WelcomeProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
}

// Export patterns
export default Welcome; // Default export
export { Welcome }; // Named export
```

**Component Best Practices:**
- Always start component names with a capital letter
- Keep components small and focused (Single Responsibility)
- Extract reusable logic into custom hooks
- Use TypeScript for better type safety
- Prefer function components over class components

### JSX Syntax Rules

```jsx
// ✅ Good: Wrapped in parent element
function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

// ✅ Good: Using Fragment
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

// ✅ Good: Self-closing tags
<img src="image.jpg" alt="description" />
<input type="text" />
<br />

// ✅ Good: Conditional rendering
{isLoggedIn && <UserDashboard />}
{isLoggedIn ? <Dashboard /> : <Login />}

// ✅ Good: List rendering with keys
{items.map(item => (
  <ListItem key={item.id} item={item} />
))}
```

### React Hooks

#### useState - State Management

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // ✅ Good: Function updater for state based on previous value
  const increment = () => setCount(prev => prev + 1);

  // ✅ Good: Multiple state variables
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// Complex state with objects
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form>
      <input
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
      />
    </form>
  );
}
```

#### useEffect - Side Effects

```jsx
import { useEffect, useState } from 'react';

function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const result = await response.json();

        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function
    return () => {
      cancelled = true;
    };
  }, [userId]); // Dependencies array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{JSON.stringify(data)}</div>;
}

// Common useEffect patterns
useEffect(() => {
  // Runs on every render
});

useEffect(() => {
  // Runs only once on mount
}, []);

useEffect(() => {
  // Runs when deps change
}, [dep1, dep2]);

useEffect(() => {
  const timer = setTimeout(() => {
    // Do something
  }, 1000);

  return () => clearTimeout(timer); // Cleanup
}, []);
```

#### useContext - Global State

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create context
const ThemeContext = createContext(null);

// 2. Create provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create custom hook for consuming context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Use in components
function Button() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{ background: theme === 'light' ? '#fff' : '#000' }}
    >
      Toggle Theme
    </button>
  );
}

// 5. Wrap app with provider
function App() {
  return (
    <ThemeProvider>
      <Button />
    </ThemeProvider>
  );
}
```

#### useRef - References and Mutable Values

```jsx
import { useRef, useEffect } from 'react';

function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}

// Storing mutable values (doesn't trigger re-render)
function Timer() {
  const intervalRef = useRef(null);
  const [count, setCount] = useState(0);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

#### useMemo & useCallback - Performance Optimization

```jsx
import { useMemo, useCallback, useState } from 'react';

function ExpensiveComponent({ items, onItemClick }) {
  // Memoize expensive calculations
  const sortedItems = useMemo(() => {
    console.log('Sorting items...');
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]); // Only recalculate when items change

  // Memoize callback functions
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]); // Only recreate when onItemClick changes

  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// When to use:
// useMemo: Expensive calculations, prevent unnecessary re-renders of child components
// useCallback: Prevent unnecessary re-creation of functions passed as props
```

#### Custom Hooks

```jsx
// useLocalStorage - Sync state with localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      const valueToStore = newValue instanceof Function
        ? newValue(value)
        : newValue;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setStoredValue];
}

// useDebounce - Debounce value changes
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// useFetch - Data fetching hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();

        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  const searchTerm = useDebounce(name, 500);
  const { data, loading, error } = useFetch(`/api/search?q=${searchTerm}`);

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

## Forms and User Input

### Controlled Components

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subscribe: false,
    country: 'us'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({ name: '', email: '', message: '', subscribe: false, country: 'us' });
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />

      <label>
        <input
          type="checkbox"
          name="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
        />
        Subscribe to newsletter
      </label>

      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
```

## TypeScript with React

### Component Props

```tsx
// Basic props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}

// Children prop
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

// Event handlers
interface FormProps {
  onSubmit: (data: FormData) => void;
}

function Form({ onSubmit }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
    </form>
  );
}

// Generic components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

## Performance Optimization

### React.memo - Prevent Unnecessary Re-renders

```jsx
import { memo } from 'react';

// Without memo: re-renders on every parent render
function ExpensiveComponent({ data }) {
  console.log('Rendering ExpensiveComponent');
  return <div>{data}</div>;
}

// With memo: only re-renders when props change
const OptimizedComponent = memo(function OptimizedComponent({ data }) {
  console.log('Rendering OptimizedComponent');
  return <div>{data}</div>;
});

// Custom comparison function
const CustomMemoComponent = memo(
  function CustomMemoComponent({ user }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);
```

### Code Splitting

```jsx
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}

// Route-based code splitting
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

## Common Patterns

### Compound Components

```jsx
// Flexible component API
function Select({ children, value, onChange }) {
  return (
    <div className="select">
      {children}
    </div>
  );
}

Select.Option = function Option({ value, children }) {
  return <option value={value}>{children}</option>;
};

// Usage
function App() {
  return (
    <Select value="us" onChange={(e) => console.log(e.target.value)}>
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="uk">United Kingdom</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
    </Select>
  );
}
```

### Render Props

```jsx
function DataProvider({ render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return render({ data, loading });
}

// Usage
<DataProvider
  render={({ data, loading }) => (
    loading ? <div>Loading...</div> : <div>{data}</div>
  )}
/>
```

### Higher-Order Components (HOC)

```jsx
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return <Component {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

## Testing React Components

```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Basic component test
test('renders button with correct text', () => {
  render(<Button label="Click me" onClick={() => {}} />);
  const button = screen.getByText('Click me');
  expect(button).toBeInTheDocument();
});

// Testing user interactions
test('calls onClick when button is clicked', async () => {
  const handleClick = jest.fn();
  render(<Button label="Click me" onClick={handleClick} />);

  const button = screen.getByText('Click me');
  await userEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Testing async operations
test('fetches and displays data', async () => {
  render(<DataFetcher userId={1} />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/user data/i)).toBeInTheDocument();
  });
});

// Testing forms
test('submits form with correct data', async () => {
  const handleSubmit = jest.fn();
  render(<ContactForm onSubmit={handleSubmit} />);

  await userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
  await userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');
  await userEvent.click(screen.getByText('Submit'));

  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com'
  });
});
```

## Common Mistakes and Anti-Patterns

### ❌ Don't

```jsx
// ❌ Calling hooks conditionally
function Component({ condition }) {
  if (condition) {
    const [state, setState] = useState(0); // ERROR!
  }
}

// ❌ Mutating state directly
const [user, setUser] = useState({ name: 'John' });
user.name = 'Jane'; // ERROR!

// ❌ Missing dependencies in useEffect
useEffect(() => {
  fetchData(userId); // userId not in dependency array
}, []); // ERROR!

// ❌ Creating functions in render
function List({ items }) {
  return items.map(item => (
    <Item onClick={() => handleClick(item)} /> // Creates new function on each render
  ));
}
```

### ✅ Do

```jsx
// ✅ Always call hooks at the top level
function Component({ condition }) {
  const [state, setState] = useState(0);

  if (condition) {
    // Use state here
  }
}

// ✅ Use setState with new object
setUser({ ...user, name: 'Jane' });
// or
setUser(prev => ({ ...prev, name: 'Jane' }));

// ✅ Include all dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);

// ✅ Use useCallback for stable references
const handleClick = useCallback((item) => {
  // Handle click
}, []);
```

## Framework Integration

### Next.js (App Router)

```jsx
// app/page.tsx - Server Component
export default async function HomePage() {
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();

  return (
    <div>
      <h1>Home Page</h1>
      <ClientComponent data={json} />
    </div>
  );
}

// app/components/ClientComponent.tsx
'use client';

import { useState } from 'react';

export default function ClientComponent({ data }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

// app/api/users/route.ts - API Route
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await fetchUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  // Process data
  return NextResponse.json({ success: true });
}
```

### React Router

```jsx
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function UserDetail() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}
```

## Quick Reference

### Essential Hooks
- `useState` - Local component state
- `useEffect` - Side effects and lifecycle
- `useContext` - Access context values
- `useRef` - Mutable refs and DOM access
- `useMemo` - Memoize expensive calculations
- `useCallback` - Memoize functions
- `useReducer` - Complex state logic

### Component Lifecycle (with Hooks)
- **Mount**: `useEffect(() => { }, [])`
- **Update**: `useEffect(() => { }, [deps])`
- **Unmount**: `useEffect(() => { return () => { } }, [])`

### Best Practices
1. Keep components small and focused
2. Use TypeScript for type safety
3. Lift state up when sharing between components
4. Colocate related code
5. Use custom hooks for reusable logic
6. Memoize expensive calculations
7. Use proper key props in lists
8. Handle loading and error states
9. Clean up effects properly
10. Follow naming conventions

## Resources

Official Documentation:
- React Docs: https://react.dev
- React API Reference: https://react.dev/reference/react
- Next.js: https://nextjs.org
- React Router: https://reactrouter.com
- Testing Library: https://testing-library.com/react

## Troubleshooting

**Problem: Component not re-rendering**
- Check if state is being mutated directly
- Verify dependencies in useEffect
- Ensure setState is called with new reference

**Problem: Infinite loop in useEffect**
- Check dependency array for objects/arrays being recreated
- Use useMemo/useCallback to stabilize references
- Ensure dependencies don't change on every render

**Problem: Memory leaks**
- Clean up subscriptions in useEffect return
- Cancel async operations when component unmounts
- Clear timers and intervals

**Problem: Performance issues**
- Use React DevTools Profiler
- Implement React.memo for expensive components
- Use useMemo for expensive calculations
- Use useCallback for stable function references
- Consider code splitting with lazy()
