export default() => {
    const envn = new Event('resize');
    window.dispatchEvent(envn);
}
