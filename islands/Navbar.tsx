import { signal } from "@preact/signals";

const isOpen = signal(false);

export default function Navbar() {
  const toggleMenu = () => {
    isOpen.value = !isOpen.value;
  };

  return (
    <header class="bg-indigo-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          {/* Logo */}
          <div class="flex-shrink-0">
            <a href="/" class="text-2xl font-bold">
              Hangout
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav class="hidden md:flex space-x-8">
            <a
              href="/"
              class="text-sm font-medium hover:text-indigo-300 transition"
            >
              Home
            </a>
            <a
              href="/about"
              class="text-sm font-medium hover:text-indigo-300 transition"
            >
              About
            </a>
            <a
              href="/register"
              class="text-sm font-medium hover:text-indigo-300 transition"
            >
              Register
            </a>
            <a
              href="/login"
              class="text-sm font-medium hover:text-indigo-300 transition"
            >
              Login
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div class="md:hidden">
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen.value
                ? (
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )
                : (
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          class={`md:hidden ${
            isOpen.value ? "block" : "hidden"
          } space-y-2 mt-2 bg-indigo-700 p-4 rounded-lg`}
        >
          <a
            href="/"
            class="block text-sm font-medium hover:text-indigo-300 transition"
          >
            Home
          </a>
          <a
            href="/about"
            class="block text-sm font-medium hover:text-indigo-300 transition"
          >
            About
          </a>
          <a
            href="/register"
            class="block text-sm font-medium hover:text-indigo-300 transition"
          >
            Register
          </a>
          <a
            href="/login"
            class="block text-sm font-medium hover:text-indigo-300 transition"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
