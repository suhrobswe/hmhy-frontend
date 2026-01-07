
export default function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <h1 style={{ fontSize: "80px", margin: 0 }}>404</h1>
            <p style={{ fontSize: "24px", marginBottom: "20px" }}>
                Page Not Found
            </p>
        </div>
    );
}
