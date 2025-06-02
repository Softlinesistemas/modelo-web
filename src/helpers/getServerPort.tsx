export function getServerPort(config: any) {
    const match = config.DataSource.match(/,(\d+)$/); 
    return match ? match[1] : 1433;
}
