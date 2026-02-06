# Google Forms Import Guide - From CSV/Markdown

**Updated February 5, 2026 - Multiple methods to import survey questions**

---

## 🎯 QUICK ANSWER

**YES, you can create Google Forms from CSV/Markdown, but NOT directly.** You need add-ons or scripts.

**Best Method:** **AI Form Builder** add-on (free, works with Google Docs/Sheets)

---

## 📋 METHODS TO IMPORT QUESTIONS

### Method 1: AI Form Builder Add-on (RECOMMENDED)
**Cost:** Free  
**Best for:** Quick bulk import from Google Docs/Sheets  
**Difficulty:** Easy

**Steps:**
1. **Install AI Form Builder** from Google Workspace Marketplace
2. **Create Google Doc** with your questions (copy from markdown)
3. **Open Google Doc** → Add-ons → AI Form Builder → Import
4. **Select "Google Docs"** as source
5. **Choose your document** and click "Get Questions"
6. **Review questions** in preview
7. **Click "Import Questions"** → Instant Google Form!

**What it can import:**
- ✅ Multiple choice questions
- ✅ Checkbox questions  
- ✅ Short answer questions
- ✅ Paragraph questions
- ✅ Dropdown questions
- ✅ Linear scale questions
- ✅ Date/time questions

**Limitations:**
- ⚠️ No advanced conditional logic
- ⚠️ No calculations or scoring
- ⚠️ Limited customization during import

---

### Method 2: Google Apps Script (TECHNICAL)
**Cost:** Free  
**Best for:** Developers, custom automation  
**Difficulty:** Medium-Hard

**Steps:**
1. **Install Python** and clone the GitHub repo:
   ```bash
   git clone https://github.com/sverch/google-form-from-markdown-file
   cd google-form-from-markdown-file
   ```

2. **Create markdown file** with your questions:
   ```markdown
   # Survey Title
   
   ## Question 1
   How did you discover your last server?
   - Friend
   - YouTube  
   - TikTok
   - Discord
   - Reddit
   
   ## Question 2
   What's your age range?
   - Under 13
   - 13-17
   - 18-24
   - 25-34
   - 35+
   ```

3. **Generate Google Apps Script:**
   ```bash
   python make-script.py your-survey.md > script.js
   ```

4. **Create Google Apps Script:**
   - Go to [script.google.com](https://script.google.com)
   - Create new project
   - Paste the generated `script.js`
   - Run the script → Creates Google Form automatically

**Pros:**
- ✅ Complete control over question types
- ✅ Can automate multiple forms
- ✅ Free and open source

**Cons:**
- ❌ Requires Python knowledge
- ❌ Manual setup process
- ❌ Debugging can be complex

---

### Method 3: Manual CSV → Google Sheets → Google Forms
**Cost:** Free  
**Best for:** Simple questions, no coding needed  
**Difficulty:** Easy-Medium

**Steps:**
1. **Create CSV file** with your questions:
   ```csv
   Question Type,Question Title,Option 1,Option 2,Option 3,Option 4
   Multiple Choice,How did you find your last server?,Friend,YouTube,TikTok,Discord
   Checkbox,Which platforms do you use?,YouTube,TikTok,Discord,Reddit
   Short Answer,What's your favorite server type?,,,
   Linear Scale,Rate server importance (1-5),1,2,3,4,5
   ```

2. **Import CSV to Google Sheets:**
   - File → Import → Upload → Select CSV
   - Choose "Detect automatically" for separator

3. **Use Google Sheets data to create form:**
   - Open Google Forms
   - Use "Form Builder for Sheets" add-on
   - Select your sheet as data source
   - Map columns to question types

**Limitations:**
- ⚠️ Requires specific CSV formatting
- ⚠️ Limited question type support
- ⚠️ May need manual adjustments

---

## 🛠️ RECOMMENDED WORKFLOW FOR YOUR SURVEYS

### For Player Survey (13 questions with complex logic)

**Option A: AI Form Builder (Easiest)**
1. **Copy your survey questions** to Google Doc
2. **Install AI Form Builder** add-on
3. **Import from Google Doc** → Creates basic form
4. **Manually add conditional logic** (MaxDiff, branching)
5. **Test and refine**

**Option B: Manual Build (Most Control)**
1. **Create Google Form** manually
2. **Copy-paste questions** from your markdown file
3. **Set up conditional logic** manually
4. **Test thoroughly**

### For Server Owner Interviews (17 questions, simple)

**Option A: AI Form Builder (Fastest)**
1. **Copy interview questions** to Google Doc
2. **Import with AI Form Builder**
3. **Minor adjustments** if needed

**Option B: Direct Google Forms (Simple)**
1. **Create form manually** (only 17 questions)
2. **Copy-paste questions** directly
3. **Done in 10 minutes**

---

## 📝 MARKDOWN TO GOOGLE DOCS CONVERSION

### Your Survey Questions Format

Your current format in `player-server-discovery-survey.md`:

```markdown
### Q1: How did you discover the LAST Hytale/Minecraft server you joined?
*Select ONE option*

- [ ] Friend or family member told me
- [ ] YouTube video or stream
- [ ] TikTok video
- [ ] Discord server or invite
- [ ] Instagram post
- [ ] Twitter/X post
- [ ] Reddit post or comment
- [ ] Twitch stream
- [ ] Server directory website
- [ ] In-game server browser
- [ ] Google search
- [ ] Other: ___________
```

### Convert to Google Docs Format

**For AI Form Builder, use this format:**

```
How did you discover the LAST Hytale/Minecraft server you joined?

○ Friend or family member told me
○ YouTube video or stream  
○ TikTok video
○ Discord server or invite
○ Instagram post
○ Twitter/X post
○ Reddit post or comment
○ Twitch stream
○ Server directory website
○ In-game server browser
○ Google search
○ Other: ___________
```

**Tips for conversion:**
- Replace `*Select ONE option*` with just the question
- Replace `- [ ]` with `○` for single choice
- Replace `- [ ]` with `□` for multiple choice
- Remove markdown formatting like `**bold**`
- Keep questions simple and clear

---

## 🔧 ADVANCED FEATURES WORKAROUND

### Conditional Logic (MaxDiff Questions)

**Google Forms limitation:** No built-in MaxDiff support

**Workaround:**
1. **Create separate sections** for each MaxDiff set
2. **Use section branching** based on previous answers
3. **Manual setup** required for each logic path

**Example:**
```
Section 1: Show Feature Set A
→ Branch to Section 2 based on "Most Important" selection

Section 2: Show Feature Set B  
→ Branch to Section 3 based on "Most Important" selection
```

### Answer Piping

**Google Forms limitation:** No answer piping (referencing previous answers)

**Workaround:**
- Use section descriptions to reference previous answers
- Manually create follow-up questions
- Consider using Tally instead for advanced features

---

## 📊 IMPORT SUCCESS METRICS

### What Works Well
- ✅ **Basic question types** (multiple choice, short answer)
- ✅ **Bulk import** (10+ questions at once)
- ✅ **Question order** preserved
- ✅ **Answer options** imported correctly

### What Needs Manual Fix
- ⚠️ **Conditional logic** (set up manually)
- ⚠️ **Question validation** (set up manually)
- ⚠️ **Section breaks** (add manually)
- ⚠️ **Progress indicators** (add manually)

---

## 🎯 FINAL RECOMMENDATION

### For Your Specific Needs

**Player Survey (Complex):**
```
Option 1: AI Form Builder + Manual Logic Setup
Time: 30 minutes
Cost: Free
Result: Working form with basic questions, add logic manually

Option 2: Manual Build in Google Forms  
Time: 45 minutes
Cost: Free
Result: Complete control over all features
```

**Server Owner Interviews (Simple):**
```
Option 1: AI Form Builder
Time: 15 minutes  
Cost: Free
Result: Quick import, minor tweaks needed

Option 2: Manual Build
Time: 20 minutes
Cost: Free  
Result: Full control, straightforward setup
```

### My Recommendation

**Start with AI Form Builder** for both surveys:
1. **Quick import** saves time
2. **Good enough** for initial testing
3. **Can refine manually** later if needed

**If you hit limitations**, switch to manual build or consider **Tally** (which has better advanced features for free).

---

## 🚀 NEXT STEPS

1. **Install AI Form Builder** from Google Workspace Marketplace
2. **Copy your survey questions** to Google Docs
3. **Test import with 3-5 questions** first
4. **Review and adjust** question types
5. **Add conditional logic** manually
6. **Test complete flow** before distribution

**Ready to try the import? I can help you format the questions for AI Form Builder!**
