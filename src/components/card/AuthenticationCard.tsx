import { useNavigate } from "react-router-dom";

const AuthenticationCard = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full bg-white max-w-md rounded-xl border border-border/50 bg-card shadow-lg">
        {/* Header */}
        <div className="space-y-4 p-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-card-foreground">Authentication Required</h1>
            <p className="text-balance text-base leading-relaxed text-muted-foreground">
              You need to be logged in to access this resource. Please sign in to continue.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 px-6 pb-6">
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <span className="text-xs font-semibold text-accent">!</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-card-foreground">Status Code: 401</p>
                <p className="text-sm text-muted-foreground">
                  Your session may have expired or you don't have permission to view this content.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 p-6 pt-0">
          <button
            onClick={() => navigate(-1)}
            className="h-11 w-full rounded-lg px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  )
}

export default AuthenticationCard;
