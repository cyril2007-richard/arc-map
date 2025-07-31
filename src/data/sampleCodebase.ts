// Sample structure.json data representing a typical React project
export const sampleCodebase = {
  "files": [
    {
      "path": "src/App.tsx",
      "language": "typescript",
      "type": "component",
      "functions": ["App"],
      "classes": [],
      "imports": ["React", "./Router", "./AuthProvider"],
      "exports": ["App"],
      "errors": [],
      "modified": false,
      "lines": 85
    },
    {
      "path": "src/components/Header.tsx",
      "language": "typescript", 
      "type": "component",
      "functions": ["Header", "handleLogout"],
      "classes": [],
      "imports": ["React", "../hooks/useAuth", "lucide-react"],
      "exports": ["Header"],
      "errors": [{ "message": "Unused variable 'theme'", "line": 12 }],
      "modified": false,
      "lines": 45
    },
    {
      "path": "src/hooks/useAuth.ts",
      "language": "typescript",
      "type": "hook",
      "functions": ["useAuth", "login", "logout"],
      "classes": [],
      "imports": ["React", "../services/authService"],
      "exports": ["useAuth"],
      "errors": [],
      "modified": true,
      "lines": 67
    },
    {
      "path": "src/services/authService.ts",
      "language": "typescript",
      "type": "service",
      "functions": ["authenticate", "validateToken", "refreshToken"],
      "classes": ["AuthService"],
      "imports": ["axios", "../types/User"],
      "exports": ["AuthService", "authenticate"],
      "errors": [],
      "modified": false,
      "lines": 120
    },
    {
      "path": "src/utils/helpers.ts",
      "language": "typescript",
      "type": "utility",
      "functions": ["formatDate", "debounce", "deepClone"],
      "classes": [],
      "imports": ["date-fns"],
      "exports": ["formatDate", "debounce", "deepClone"],
      "errors": [],
      "modified": false,
      "lines": 34
    },
    {
      "path": "src/types/User.ts",
      "language": "typescript",
      "type": "type",
      "functions": [],
      "classes": [],
      "imports": [],
      "exports": ["User", "UserRole", "AuthState"],
      "errors": [],
      "modified": false,
      "lines": 28
    },
    {
      "path": "src/components/Dashboard.tsx",
      "language": "typescript",
      "type": "component", 
      "functions": ["Dashboard", "loadUserData", "handleRefresh"],
      "classes": [],
      "imports": ["React", "../hooks/useAuth", "../services/dataService", "./Chart"],
      "exports": ["Dashboard"],
      "errors": [{ "message": "Promise not awaited", "line": 23 }],
      "modified": false,
      "lines": 89
    },
    {
      "path": "src/components/Chart.tsx",
      "language": "typescript",
      "type": "component",
      "functions": ["Chart", "processData"],
      "classes": [],
      "imports": ["React", "recharts", "../utils/helpers"],
      "exports": ["Chart"],
      "errors": [],
      "modified": false,
      "lines": 156
    },
    {
      "path": "src/services/dataService.ts",
      "language": "typescript",
      "type": "service",
      "functions": ["fetchUserData", "updateUserData", "deleteUserData"],
      "classes": ["DataService"],
      "imports": ["axios", "../types/User", "./authService"],
      "exports": ["DataService", "fetchUserData"],
      "errors": [],
      "modified": false,
      "lines": 78
    },
    {
      "path": "src/styles/globals.css",
      "language": "css",
      "type": "style",
      "functions": [],
      "classes": [],
      "imports": [],
      "exports": [],
      "errors": [],
      "modified": false,
      "lines": 156
    }
  ]
};

export type CodebaseFile = typeof sampleCodebase.files[0];
export type CodebaseStructure = typeof sampleCodebase;